import { Component, OnInit } from '@angular/core';
import { Apartamento, Predio } from 'src/app/core/model';
import { ApartamentoService } from '../apartamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import Notiflix from 'notiflix';
import { PredioService } from 'src/app/predio/predio.service';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-apartamento-form',
  templateUrl: './apartamento-form.component.html',
  styleUrls: ['./apartamento-form.component.css']
})
export class ApartamentoFormComponent implements OnInit {

  apartamento = new Apartamento();
  predios: Predio[] = [];

  constructor(
    private apartamentoService: ApartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private handler: HandlerService,
    private title: Title,
    private predioService: PredioService
  ) { }

  ngOnInit(): void {
    const idApartamento = this.route.snapshot.params['id'];
    this.title.setTitle('Novo apartamento');

    if (idApartamento) {
      this.findById(idApartamento);
    }

    this.carregarPredios();
  }

  carregarPredios(): Promise<void> {
    return this.predioService.findAll()
      .then(predios => {
        this.predios = predios;
      })
      .catch(erro => this.handler.handle(erro));
  }

  create(form: NgForm) {
    const payload = {
      ...this.apartamento,
      predio: { id: this.apartamento.predio.id }
    };

    this.apartamentoService.create(payload)
      .then(() => {
        Notiflix.Notify.success('Apartamento salvo com sucesso!');
        form.resetForm();
        this.apartamento = new Apartamento();
      })
      .catch(erro => this.handler.handle(erro));
  }

  findById(id: number) {
    this.apartamentoService.findById(id)
      .then(apartamento => {
        this.apartamento = apartamento;
        this.updateTitle();

        this.carregarPredios().then(() => {
          const predioSelecionado = this.predios.find(p => p.id === apartamento.predio?.id);
          if (predioSelecionado) {
            this.apartamento.predio = predioSelecionado;
          }
        });
      })
      .catch(erro => this.handler.handle(erro));
  }

  update(form: NgForm) {
    const payload = {
      ...this.apartamento,
      predio: { id: this.apartamento.predio.id }
    };

    this.apartamentoService.update(payload)
      .then(() => {
        Notiflix.Notify.success('Apartamento atualizado com sucesso!');
        this.apartamento = this.apartamento;
        this.updateTitle();
      })
      .catch(erro => this.handler.handle(erro));
  }

  get editando() {
    return Boolean(this.apartamento.id);
  }

  save(form: NgForm) {
    if (this.editando) {
      this.update(form);
      this.router.navigate(['/apartamento/list']);
    } else {
      this.create(form);
    }
  }

  new(form: NgForm) {
    form.reset();
    this.router.navigate(['/apartamento/new']);
  }

  updateTitle() {
    this.title.setTitle(`Edição de apartamento: ${this.apartamento.id}`);
  }
}
