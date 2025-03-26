import { Component, OnInit, ViewChild } from '@angular/core';
import { Apartamento, ApartamentoFilter } from 'src/app/core/model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ApartamentoService } from '../apartamento.service';
import { NavigationEnd, Router } from '@angular/router';
import { HandlerServiceService } from 'src/app/core/handler-service.service';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-apartamento-list',
  templateUrl: './apartamento-list.component.html',
  styleUrls: ['./apartamento-list.component.css']
})
export class ApartamentoListComponent implements OnInit {

  apartamentos: Apartamento[] = [];
  apartamento: Apartamento = new Apartamento();

  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  apartamentoSelecionado!: Apartamento;

  totalRegistros = 0;
  filters = new ApartamentoFilter();

  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private apartamentoService: ApartamentoService,
    private router: Router,
    private handler: HandlerServiceService,
    private title: Title
  ) {
    this.filters.intensPorPagina = 5;
  }

  ngOnInit(): void {
    this.title.setTitle('Lista apartamentos');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/apartamento/list') {
        this.filter();
      }
    });

    if (this.router.url === '/apartamento/list') {
      this.filter();
    }
  }

  delete(apartamento: Apartamento) {
    this.apartamentoService.delete(apartamento.id!)
      .then(() => {
        Notiflix.Notify.success('Apartamento deletado com sucesso!');
        this.filter();
      })
      .catch(erro => this.handler.handle(erro));
  }

  editarApartamento() {
    this.router.navigate(['/apartamento', this.apartamentoSelecionado.id]);
  }

  openDeleteModal(apartamento: Apartamento) {
    this.apartamentoSelecionado = apartamento;
    this.confirmModal.openModal();
  }

  openEditModal(apartamento: Apartamento) {
    this.apartamentoSelecionado = apartamento;
    this.confirmEditModal.openModal();
  }

  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.apartamentoService.filter(this.filters)
      .then(result => {
        this.totalRegistros = result.total;
        this.apartamentos = result.apartamentos;

        this.totalPaginas = Math.ceil(this.totalRegistros / this.filters.intensPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i);
      })
      .catch(erro => this.handler.handle(erro));
  }

  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.filter(pagina);
    }
  }

  gerarPdf(apartamento: Apartamento) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Relatório de Apartamento', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Descrição']],
      body: [[
        apartamento.id ?? '',
        apartamento.descricao ?? ''
      ]],
      styles: {
        fontSize: 11,
        cellPadding: 4
      },
      headStyles: {
        fillColor: [0, 105, 92],
        textColor: [255, 255, 255],
        halign: 'center'
      },
      columnStyles: {
        1: { halign: 'left', cellWidth: 100 },
        2: { halign: 'center', cellWidth: 'wrap' }
      }
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text('Sistema de Gestão de Apartamentos - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`apartamento-${apartamento.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}
