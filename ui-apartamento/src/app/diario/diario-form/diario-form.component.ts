import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Diario } from 'src/app/core/model';
import { DiarioService } from '../diario.service';
import { ActivatedRoute } from '@angular/router';
import Notiflix from 'notiflix';


@Component({
  selector: 'app-diario-form',
  templateUrl: './diario-form.component.html',
  styleUrls: ['./diario-form.component.css']
})
export class DiarioFormComponent implements OnInit {

  diario = new Diario();

  constructor(
    private diarioService: DiarioService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    const idDiario = this.route.snapshot.params['id'];
    if(idDiario){
      this.findById(idDiario);
    }
  }

  create(form:NgForm) {
    this.diarioService.create(this.diario)
    .then((response) => {
      Notiflix.Notify.success('Diário salvo com sucesso!');
      form.resetForm(); 
      this.diario = new Diario();
    }).catch((error => {
      Notiflix.Notify.failure('Erro ao salvar o diário.');
    }))
  }

  findById(id: number){
    this.diarioService.findById(id).then(diario => {
      this.diario = diario;
    }).catch(error => {
      Notiflix.Notify.failure('Erro ao carregar o diário.');
    });
  }

  update(form: NgForm){
    this.diarioService.update(this.diario)
    .then(response => {
      Notiflix.Notify.success('Diário atualizado com sucesso!');
      this.diario = this.diario;
    }).catch(error => console.log(error));
  }

  get editando() {
    return Boolean(this.diario.id);
  }


  save(form: NgForm) {
    if (this.editando) {
      this.update(form);
    } else {
      this.create(form);
    }
  }

}
