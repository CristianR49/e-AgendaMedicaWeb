import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AtividadesService } from '../services/atividade.service';
import { Router } from '@angular/router';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-atividade',
  templateUrl: './inserir-atividade.component.html',
  styleUrls: ['./inserir-atividade.component.css'],
})
export class InserirAtividadeComponent implements OnInit {
  form!: FormGroup;
  atividadeVM!: FormsAtividadeViewModel;
  model: any;

  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadesService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horarioInicio: new FormControl('', [Validators.required]),
      horarioTermino: new FormControl('', [Validators.required]),
      tipoAtividade: new FormControl('', [Validators.required]),
      medicos: new FormControl('', [Validators.required])
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.atividadeVM = this.form.value;

    this.atividadeService.inserir(this.atividadeVM).subscribe({
      next: (atividade: FormsAtividadeViewModel) => this.processarSucesso(atividade),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(atividade: FormsAtividadeViewModel) {
    this.toastrService.success(
      `A Atividade "${atividade.nome}" foi cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/atividades/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
