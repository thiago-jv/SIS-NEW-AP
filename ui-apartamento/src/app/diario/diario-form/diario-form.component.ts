import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Diario } from 'src/app/core/model';
import { DiarioService } from '../diario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Notiflix from 'notiflix';
import { Title } from '@angular/platform-browser';
import { HandlerService } from 'src/app/core/handler.service';

@Component({
  selector: 'app-diario-form',
  templateUrl: './diario-form.component.html',
  styleUrls: ['./diario-form.component.css']
})
export class DiarioFormComponent implements OnInit {

  diario = new Diario();

  constructor(
    private diarioService: DiarioService,
    private route: ActivatedRoute,
    private router: Router,
    private handler: HandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idDiario = this.route.snapshot.params['id'];

    this.title.setTitle('Novo diario')

    if (idDiario) {
      this.findById(idDiario);
    }
  }

  create(form: NgForm) {
    this.diarioService.create(this.diario)
      .then((response) => {
        Notiflix.Notify.success('Diário salvo com sucesso!');
        form.resetForm();
        this.diario = new Diario();
      }).catch(erro => this.handler.handle(erro));
  }

  findById(id: number) {
    this.diarioService.findById(id)
      .then(diario => {
        this.diario = diario;
        this.updateTitle();
      })
      .catch(erro => this.handler.handle(erro));
  }

  update(form: NgForm) {
    this.diarioService.update(this.diario)
      .then(response => {
        Notiflix.Notify.success('Diário atualizado com sucesso!');
        this.diario = this.diario;
        this.updateTitle();
      })
      .catch(erro => this.handler.handle(erro));
  }

  get editando() {
    return Boolean(this.diario.id);
  }

  save(form: NgForm) {
    if (this.editando) {
      this.update(form);
      this.router.navigate(['/diario/list']);
    } else {
      this.create(form);
    }
  }

  new(form: NgForm) {
    form.reset();
    this.router.navigate(['/diario/new']);
  }

  updateTitle(){
    this.title.setTitle(`Edição de diario: ${this.diario.id}`);
  }

}
