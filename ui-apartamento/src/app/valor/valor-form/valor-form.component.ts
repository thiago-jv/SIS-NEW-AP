import { Component, OnInit } from '@angular/core';
import { Valor } from 'src/app/core/model';
import { ValorService } from '../valor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import Notiflix from 'notiflix';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-valor-form',
  templateUrl: './valor-form.component.html',
  styleUrls: ['./valor-form.component.css']
})
export class ValorFormComponent implements OnInit {

  valor = new Valor();

  constructor(
    private valorService: ValorService,
    private route: ActivatedRoute,
    private router: Router,
    private handler: HandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idvalor = this.route.snapshot.params['id'];

    this.title.setTitle('Novo valor');

    if (idvalor) {
      this.findById(idvalor);
    }
  }

  create(form: NgForm) {
    this.valorService.create(this.valor)
      .then(() => {
        Notiflix.Notify.success('Valor salvo com sucesso!');
        form.resetForm();
        this.valor = new Valor();
      }).catch(erro => this.handler.handle(erro));
  }

  findById(id: number) {
    this.valorService.findById(id)
      .then(valor => {
        this.valor = valor;
        this.updateTitle();
      })
      .catch(erro => this.handler.handle(erro));
  }

  update(form: NgForm) {
    this.valorService.update(this.valor)
      .then(() => {
        Notiflix.Notify.success('Valor atualizado com sucesso!');
        this.updateTitle();
      })
      .catch(erro => this.handler.handle(erro));
  }

  get editando() {
    return Boolean(this.valor.id);
  }

  save(form: NgForm) {
    if (this.editando) {
      this.update(form);
      this.router.navigate(['/valor/list']);
    } else {
      this.create(form);
    }
  }

  new(form: NgForm) {
    form.reset();
    this.router.navigate(['/valor/new']);
  }

  updateTitle() {
    this.title.setTitle(`Edição de valor: ${this.valor.id}`);
  }
}
