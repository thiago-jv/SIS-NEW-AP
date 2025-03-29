import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Notiflix from 'notiflix';
import { Inquilino } from 'src/app/core/model';
import { InquilinoService } from '../inquilino.service';
import { HandlerService } from 'src/app/core/handler.service';
import { cpf } from 'cpf-cnpj-validator'; 

@Component({
  selector: 'app-inquilino-form',
  templateUrl: './inquilino-form.component.html',
  styleUrls: ['./inquilino-form.component.css']
})
export class InquilinoFormComponent implements OnInit {

  inquilino: Inquilino = new Inquilino;
  isCpfValid: boolean = false;
  generos: string[] = ['MASCULINO', 'FEMININO', 'OUTROS'];
  status: string[] = ['ATIVO', 'INATIVO'];

  constructor(
    private inquilinoService: InquilinoService,
    private route: ActivatedRoute,
    private handler: HandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const idPredio = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Inquilino');
    if(idPredio){
      this.findById(idPredio);
    }
  }

  create(form: NgForm) {
    this.inquilinoService.create(this.inquilino)
    .then((response) => {
      Notiflix.Notify.success('Inquilino salvo com sucesso');
      form.resetForm();
      this.isCpfValid = false;
      this.inquilino = new Inquilino();
    }).catch(erro => this.handler.handle(erro));
  }

  findById(id: number) {
    this.inquilinoService.findById(id)
    .then(inquilino => {
      this.inquilino = inquilino;
      this.updateTitle();
      if (this.inquilino.cpf) {
        this.isCpfValid = true;
      }
    }).catch(erro => this.handler.handle(erro));
  }

  update(form: NgForm){
    this.inquilinoService.update(this.inquilino)
    .then(response => {
      Notiflix.Notify.success('Inquilino atualizado com sucesso');
      this.inquilino = this.inquilino;
      this.updateTitle();
    })
  }

  get editando(){
    return Boolean(this.inquilino.id);
  }

   save(form: NgForm) {
    if(this.editando){
      this.update(form);
      this.router.navigate(['/inquilino/list']);
    } else {
      this.create(form);
    }
  }

  new(form: NgForm) {
    form.reset();
    this.router.navigate(['/inquilino/new']);
  }

  updateTitle(){
    this.title.setTitle(`Edição de inquilino: ${this.inquilino.id}`);
  }

  validateCpf(number: string): boolean {
    const cleanedCpf = number.replace(/\D/g, '');
    if (cleanedCpf.length === 11 && cpf.isValid(cleanedCpf)) {
      this.isCpfValid = true;
      return true;
    }
    this.isCpfValid = false;
    return false;
  }
  

}

