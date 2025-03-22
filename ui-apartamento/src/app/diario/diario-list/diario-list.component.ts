// Importações principais do Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Diario, DiarioFilter } from 'src/app/core/model'; // Modelos de dados
import { DiarioService } from '../diario.service'; // Serviço que acessa a API
import Notiflix from 'notiflix'; // Biblioteca para notificações
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component'; // Componente de confirmação
import { NavigationEnd, Router } from '@angular/router'; // Para monitorar rotas

// Importações do jsPDF e plugin para tabelas
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Decorador Angular que define metadados do componente
@Component({
  selector: 'app-diario-list', // Seletor usado no HTML
  templateUrl: './diario-list.component.html', // Template do componente
  styleUrls: ['./diario-list.component.css'] // Estilo CSS aplicado
})
export class DiarioListComponent implements OnInit {

  diarios: Diario[] = []; // Lista de diários exibidos na tabela
  diario: Diario = new Diario(); // Modelo usado como referência

  // Referências dos modais de confirmação (excluir e editar)
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  diarioSelecionado!: Diario; // Diário selecionado para excluir ou editar

  totalRegistros = 0; // Total de registros retornados pelo backend
  filters = new DiarioFilter(); // Filtros usados na pesquisa

  // Variáveis de paginação
  paginaAtual = 0;
  totalPaginas = 0;
  paginas: number[] = [];

  constructor(
    private diarioService: DiarioService, // Injeta serviço para consumir API
    private router: Router // Injeta roteador Angular
  ) {
    // Define o número de itens por página como padrão
    this.filters.intensPorPagina = 5;
  }

  // === Ciclo de vida: onInit ===
  ngOnInit(): void {
    // Executa filtro apenas se estiver na rota correta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/diario/list') {
        this.filter();
      }
    });

    // Também executa o filtro no primeiro carregamento
    if (this.router.url === '/diario/list') {
      this.filter();
    }
  }

  // === Deleta um diário ===
  delete(diario: Diario) {
    this.diarioService.delete(diario.id!)
      .then(() => {
        Notiflix.Notify.success('Diário deletado com sucesso!');
        this.filter(); // Atualiza a lista após exclusão
      })
      .catch(error => console.log(error));
  }

  // === Navega para a tela de edição ===
  editarDiario() {
    this.router.navigate(['/diario', this.diarioSelecionado.id]);
  }

  // === Abre modal de exclusão ===
  openDeleteModal(diario: Diario) {
    this.diarioSelecionado = diario;
    this.confirmModal.openModal();
  }

  // === Abre modal de edição ===
  openEditModal(diario: Diario) {
    this.diarioSelecionado = diario;
    this.confirmEditModal.openModal();
  }

  // === Filtra os dados com base na página e filtros ===
  filter(pagina = 0) {
    this.filters.pagina = pagina;
    this.paginaAtual = pagina;

    this.diarioService.filter(this.filters)
      .then(result => {
        // Atualiza total e a lista
        this.totalRegistros = result.total;
        this.diarios = result.diarios;

        // Calcula total de páginas e monta array de páginas
        this.totalPaginas = Math.ceil(this.totalRegistros / this.filters.intensPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i);
      })
      .catch(erro => console.log(erro));
  }

  // === Muda de página ===
  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.filter(pagina);
    }
  }

  // === Gera PDF para um único diário selecionado ===
  gerarPdf(diario: Diario) {
    const doc = new jsPDF();

    // === Título principal ===
    doc.setFontSize(16);
    doc.text('Relatório de Diário', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    // === Data e hora da geração do relatório ===
    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString('pt-BR');
    const horaFormatada = dataHoraAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    doc.setFontSize(11);
    doc.text(`Gerado em: ${dataFormatada} às ${horaFormatada}`, doc.internal.pageSize.getWidth() / 2, 23, { align: 'center' });

    // === Tabela com dados ===
    autoTable(doc, {
      startY: 30, // Distância do topo
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
    doc.text('Sistema de Gestão de Diários - www.minhaempresa.com', doc.internal.pageSize.getWidth() / 2, pageHeight - 10, { align: 'center' });

    // === Nome do arquivo com timestamp ===
    const timestamp = dataHoraAtual.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    doc.save(`diario-${diario.id ?? 'sem-id'}-${timestamp}.pdf`);
  }

}
