import { Component, OnInit, ViewChild } from '@angular/core';
import { Diario, DiarioFilter } from 'src/app/core/model';
import { DiarioService } from '../diario.service';
import Notiflix from 'notiflix';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HandlerService } from 'src/app/core/handler.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.css']
})
export class DiarioListComponent implements OnInit {

  diarios: Diario[] = [];
  diario: Diario = new Diario();
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  diarioSelecionado!: Diario;
  totalRegistros = 0;
  filters = new DiarioFilter();
  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private diarioService: DiarioService,
    private router: Router,
    private handler: HandlerService,
    private title: Title
  ) {
    this.filters.intensPorPagina = 5;
  }

  ngOnInit(): void {
    this.title.setTitle('Lista diarios');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/diario/list') {
        this.filter();
      }
    });

    if (this.router.url === '/diario/list') {
      this.filter();
    }
  }

  delete(diario: Diario) {
    this.diarioService.delete(diario.id!)
      .then(() => {
        Notiflix.Notify.success('Diário deletado com sucesso!');
        this.filter();
      })
      .catch(erro => this.handler.handle(erro));
  }

  editarDiario() {
    this.router.navigate(['/diario', this.diarioSelecionado.id]);
  }

  openDeleteModal(diario: Diario) {
    this.diarioSelecionado = diario;
    this.confirmModal.openModal();
  }

  openEditModal(diario: Diario) {
    this.diarioSelecionado = diario;
    this.confirmEditModal.openModal();
  }

  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.diarioService.filter(this.filters)
      .then(result => {
        this.totalRegistros = result.total;
        this.diarios = result.diarios;
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

  gerarPdf(diario: Diario) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Diário', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Descrição', 'Data de Registro']],
      body: [[
        diario.id ?? '',
        diario.descricao ?? '',
        diario.dataRegistro ? new Date(diario.dataRegistro).toLocaleDateString('pt-BR') : ''
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
    doc.text('Sistema de Gestão de Diários - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`diario-${diario.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}
