import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MedicosService } from '../services/medico.service';
import { Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.css'],
})
export class InserirMedicoComponent implements OnInit {
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicosService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.medicoVM = this.form.value;

    this.medicoService.inserir(this.medicoVM).subscribe({
      next: (medico: FormsMedicoViewModel) => this.processarSucesso(medico),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  validate() {
    const erros: string[] = [];

    for (let campo of Object.keys(this.form.controls)) {
      const controle = this.form.get(campo);

      if (!controle?.errors) continue;

      controle.markAsTouched();

      for (let erro of Object.keys(controle.errors)) {
        switch (erro) {
          case 'required':
            erros.push(`O campo "${campo}" é obrigatório!`);
            break;
        }
      }
    }

    return erros;
  };

  processarSucesso(medico: FormsMedicoViewModel) {
    let nomeEncurtado = this.reduzirTexto(medico.nome)
    this.toastrService.success(
      `O médico "${nomeEncurtado}" foi cadastrado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  reduzirTexto(texto: string): string {
    let maximo = 32
    if (texto.length > maximo) {
      return texto.substring(0, maximo) + '...';
    } 
    return texto;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
