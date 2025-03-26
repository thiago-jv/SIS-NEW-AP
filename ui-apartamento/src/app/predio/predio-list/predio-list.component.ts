import { Component, OnInit, ViewChild } from '@angular/core';
import { Predio, PredioFilter } from 'src/app/core/model';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { PredioService } from '../predio.service';
import { NavigationEnd, Router } from '@angular/router';
import { HandlerServiceService } from 'src/app/core/handler-service.service';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-predio-list',
  templateUrl: './predio-list.component.html',
  styleUrls: ['./predio-list.component.css']
})
export class PredioListComponent implements OnInit {

  predios: Predio[] = []; // Lista de diários exibidos na tabela
  predio: Predio = new Predio(); // Modelo usado como referência

  // Referências dos modais de confirmação (excluir e editar)
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  predioSelecionado!: Predio; // Diário selecionado para excluir ou editar

  totalRegistros = 0; // Total de registros retornados pelo backend
  filters = new PredioFilter(); // Filtros usados na pesquisa

  // Variáveis de paginação
  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private predioService: PredioService, // Injeta serviço para consumir API
    private router: Router, // Injeta roteador Angular
    private handler: HandlerServiceService,
    private title: Title
  ) {
    // Define o número de itens por página como padrão
    this.filters.intensPorPagina = 5;
  }

  // === Ciclo de vida: onInit ===
  ngOnInit(): void {
    this.title.setTitle('Lista predios');
    // Executa filtro apenas se estiver na rota correta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/predio/list') {
        this.filter();
      }
    });

    // Também executa o filtro no primeiro carregamento
    if (this.router.url === '/predio/list') {
      this.filter();
    }
  }

  // === Deleta um diário ===
  delete(predio: Predio) {
    this.predioService.delete(predio.id!)
      .then(() => {
        Notiflix.Notify.success('Diário deletado com sucesso!');
        this.filter(); // Atualiza a lista após exclusão
      })
      .catch(erro => this.handler.handle(erro));
  }

  // === Navega para a tela de edição ===
  editarPredio() {
    this.router.navigate(['/predio', this.predioSelecionado.id]);
  }

  // === Abre modal de exclusão ===
  openDeleteModal(predio: Predio) {
    this.predioSelecionado = predio;
    this.confirmModal.openModal();
  }

  // === Abre modal de edição ===
  openEditModal(predio: Predio) {
    this.predioSelecionado = predio;
    this.confirmEditModal.openModal();
  }

  // === Filtra os dados com base na página e filtros ===
  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.predioService.filter(this.filters)
      .then(result => {
        // Atualiza total e a lista
        this.totalRegistros = result.total;
        this.predios = result.predios;

        // Calcula total de páginas e monta array de páginas
        this.totalPaginas = Math.ceil(this.totalRegistros / this.filters.intensPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i);
      })
      .catch(erro => this.handler.handle(erro));
  }

  // === Muda de página ===
  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.filter(pagina);
    }
  }

  // === Gera PDF para um único diário selecionado ===
  gerarPdf(predio: Predio) {
    const doc = new jsPDF();

    // === Título principal ===
    doc.setFontSize(16);
    doc.text('Relatório de Predios', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    // === Data e hora da geração do relatório ===
    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    // === Tabela com dados ===
    autoTable(doc, {
      startY: 30, // Distância do topo
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
        fillColor: [0, 105, 92], // Teal
        textColor: [255, 255, 255],
        halign: 'center'
      },
      columnStyles: {
        1: { halign: 'left', cellWidth: 100 }, // Descrição à esquerda e quebra se necessário
        2: { halign: 'center', cellWidth: 'wrap' } // Data centralizada
      }
    });

    // === Rodapé com nome do sistema ===
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text('Sistema de Gestão de Predios - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    // === Nome do arquivo com timestamp ===
    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`predio-${predio.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}

