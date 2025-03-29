import { Component, OnInit, ViewChild } from '@angular/core';
import { Inquilino, InquilinoFilter } from 'src/app/core/model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { InquilinoService } from '../inquilino.service';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-inquilino-list',
  templateUrl: './inquilino-list.component.html',
  styleUrls: ['./inquilino-list.component.css']
})
export class InquilinoListComponent implements OnInit {

  inquilinos: Inquilino[] = [];
  inquilino: Inquilino = new Inquilino();

  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  inquilinoSelecionado!: Inquilino;

  totalRegistros = 0;
  filters = new InquilinoFilter();

  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private inquilinoService: InquilinoService,
    private router: Router,
    private handler: HandlerService,
    private title: Title
  ) {
    this.filters.intensPorPagina = 5;
  }

  ngOnInit(): void {
    this.title.setTitle('Lista inquilinos');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/inquilino/list') {
        this.filter();
      }
    });

    if (this.router.url === '/inquilino/list') {
      this.filter();
    }
  }

  delete(inquilino: Inquilino) {
    this.inquilinoService.delete(inquilino.id!)
      .then(() => {
        Notiflix.Notify.success('inquilino deletado com sucesso!');
        this.filter();
      })
      .catch(erro => this.handler.handle(erro));
  }

  editarInquilino() {
    this.router.navigate(['/inquilino', this.inquilinoSelecionado.id]);
  }

  openDeleteModal(inquilino: Inquilino) {
    this.inquilinoSelecionado = inquilino;
    this.confirmModal.openModal();
  }

  openEditModal(inquilino: Inquilino) {
    this.inquilinoSelecionado = inquilino;
    this.confirmEditModal.openModal();
  }

  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.inquilinoService.filter(this.filters)
      .then(result => {
        this.totalRegistros = result.total;
        this.inquilinos = result.inquilinos;

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

  gerarPdf(inquilino: Inquilino) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Relatório de Inquilino', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Nome']],
      body: [[
        inquilino.id ?? '',
        inquilino.nome ?? ''
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
    doc.text('Sistema de Gestão de Inquilinos - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`inquilino-${inquilino.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}
