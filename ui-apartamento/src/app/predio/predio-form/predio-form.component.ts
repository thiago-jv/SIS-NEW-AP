import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cep, Predio } from 'src/app/core/model';
import { PredioService } from '../predio.service';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';
import { ViaCepService } from 'src/app/core/viacep.service';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-predio-form',
  templateUrl: './predio-form.component.html',
  styleUrls: ['./predio-form.component.css']
})
export class PredioFormComponent implements OnInit {

  predio: Predio = new Predio;

  constructor(
    private viaCep: ViaCepService,
    private predioService: PredioService,
    private route: ActivatedRoute,
    private handler: HandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idPredio = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Predio');
    if(idPredio){
      this.findById(idPredio);
    }
  }

  create(form: NgForm) {
    this.predioService.create(this.predio)
    .then((response) => {
      Notiflix.Notify.success('Predio salvo com sucesso');
      form.resetForm();
      this.predio = new Predio();
    }).catch(erro => this.handler.handle(erro));
  }

  findById(id: number) {
    this.predioService.findById(id)
    .then(predio => {
      this.predio = predio;
      this.updateTitle();
    }).catch(erro => this.handler.handle(erro));
  }

  update(form: NgForm){
    this.predioService.update(this.predio)
    .then(response => {
      Notiflix.Notify.success('Predio atualizado com sucesso');
      this.predio = this.predio;
      this.updateTitle();
    })
  }

  get editando(){
    return Boolean(this.predio.id);
  }

   save(form: NgForm) {
    if(this.editando){
      this.update(form);
      this.router.navigate(['/predio/list']);
    } else {
      this.create(form);
    }
  }

  new(form: NgForm) {
    form.reset();
    this.router.navigate(['/predio/new']);
  }

  updateTitle(){
    this.title.setTitle(`Edição de predio: ${this.predio.id}`);
  }

  validateCep(): void {
    if (this.predio.cep && this.predio.cep.length === 8) {
      this.searchCep();
    }
  }

  searchCep(): void {
    if (this.predio.cep && this.predio.cep.length === 8) {
      this.viaCep.getByCep(this.predio.cep)
        .then((cepData: any) => {
          if (cepData.erro) {
            Notiflix.Notify.failure('CEP não encontrado');
          } else {
            this.predio.logradouro = cepData.logradouro || '';
            this.predio.bairro = cepData.bairro || '';
            this.predio.localidade = cepData.localidade || '';
            this.predio.uf = cepData.uf || '';
          }
        })
        .catch(() => {
          Notiflix.Notify.failure('Erro ao consultar o CEP');
        });
    }
  }
  
}
