import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Predio } from 'src/app/core/model';
import { PredioService } from '../predio.service';
import { HandlerServiceService } from 'src/app/core/handler-service.service';
import { Title } from '@angular/platform-browser';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-predio-form',
  templateUrl: './predio-form.component.html',
  styleUrls: ['./predio-form.component.css']
})
export class PredioFormComponent implements OnInit {

  predio: Predio = new Predio;

  constructor(
    private predioService: PredioService,
    private route: ActivatedRoute,
    private handler: HandlerServiceService,
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

}
