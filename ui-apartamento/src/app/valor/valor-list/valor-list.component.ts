import { Component, OnInit, ViewChild } from '@angular/core';
import { Valor } from 'src/app/core/model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ValorService } from '../valor.service';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-valor-list',
  templateUrl: './valor-list.component.html',
  styleUrls: ['./valor-list.component.css']
})
export class ValorListComponent implements OnInit {

  valors: Valor[] = [];
  paginatedValors: Valor[] = [];
  valor: Valor = new Valor();
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  valorSelecionado!: Valor;
  totalRegistros = 0;
  itensPorPagina = 5;
  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private valorService: ValorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadValors();
  }

  loadValors() {
    this.valorService.findAll().then((valores) => {
      this.valors = valores;
      this.totalRegistros = this.valors.length;
      this.totalPaginas = Math.ceil(this.totalRegistros / this.itensPorPagina);
      this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i);
      this.updatePageData();
    });
  }

  updatePageData() {
    const start = this.paginaAtual * this.itensPorPagina;
    const end = start + this.itensPorPagina;
    this.paginatedValors = this.valors.slice(start, end);
  }

  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.paginaAtual = pagina;
      this.updatePageData();
    }
  }

  delete(valor: Valor) {
    this.valorService.delete(valor.id!)
      .then(() => {
        Notiflix.Notify.success('Valor deletado com sucesso!');
        this.loadValors();
      })
      .catch(erro => console.error(erro));
  }

  editarValor() {
    this.router.navigate(['/valor', this.valorSelecionado.id]);
  }

  openDeleteModal(valor: Valor) {
    this.valorSelecionado = valor;
    this.confirmModal.openModal();
  }

  openEditModal(valor: Valor) {
    this.valorSelecionado = valor;
    this.confirmEditModal.openModal();
  }

  gerarPdf(valor: Valor) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Relatório de Valores', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Valor']],
      body: [[
        valor.id ?? '',
        valor.valor ?? '',
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
    doc.text('Sistema de Gestão de Valores - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`valor-${valor.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}
