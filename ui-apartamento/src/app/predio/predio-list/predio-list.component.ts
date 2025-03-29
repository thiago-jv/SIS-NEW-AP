import { Component, OnInit, ViewChild } from '@angular/core';
import { Predio, PredioFilter } from 'src/app/core/model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { PredioService } from '../predio.service';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-predio-list',
  templateUrl: './predio-list.component.html',
  styleUrls: ['./predio-list.component.css']
})
export class PredioListComponent implements OnInit {

  predios: Predio[] = [];
  predio: Predio = new Predio();
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  predioSelecionado!: Predio;
  totalRegistros = 0;
  filters = new PredioFilter();
  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private predioService: PredioService,
    private router: Router,
    private handler: HandlerService,
    private title: Title
  ) {
    this.filters.intensPorPagina = 5;
  }

  ngOnInit(): void {
    this.title.setTitle('Lista predios');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/predio/list') {
        this.filter();
      }
    });

    if (this.router.url === '/predio/list') {
      this.filter();
    }
  }

  delete(predio: Predio) {
    this.predioService.delete(predio.id!)
      .then(() => {
        Notiflix.Notify.success('Diário deletado com sucesso!');
        this.filter();
      })
      .catch(erro => this.handler.handle(erro));
  }

  editarPredio() {
    this.router.navigate(['/predio', this.predioSelecionado.id]);
  }

  openDeleteModal(predio: Predio) {
    this.predioSelecionado = predio;
    this.confirmModal.openModal();
  }

  openEditModal(predio: Predio) {
    this.predioSelecionado = predio;
    this.confirmEditModal.openModal();
  }

  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.predioService.filter(this.filters)
      .then(result => {
        this.totalRegistros = result.total;
        this.predios = result.predios;
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

  gerarPdf(predio: Predio) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Predios', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Descrição']],
      body: [[
        predio.id ?? '',
        predio.descricao ?? '',
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
    doc.text('Sistema de Gestão de Predios - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`predio-${predio.id ?? 'sem-id'}-${timestamp}.pdf`);
  }
}
