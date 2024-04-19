import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AtividadesService } from '../services/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { ToastrService } from 'ngx-toastr';
import { TipoAtividadeEnum } from '../models/TipoAtividadeEnum';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-inserir-atividade',
  templateUrl: './inserir-atividade.component.html',
  styleUrls: ['./inserir-atividade.component.css'],
})
export class InserirAtividadeComponent implements OnInit {
  form!: FormGroup;
  atividadeVM!: FormsAtividadeViewModel;
  model: any;
  enumKeys = [TipoAtividadeEnum.Consulta, TipoAtividadeEnum.Cirurgia]
  medicosDisponiveis: ListarMedicoViewModel[] = [];

  medicosSelecionados: ListarMedicoViewModel[] = [];
  medicoFoiSelecionado: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadesService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horarioInicio: new FormControl('', [Validators.required]),
      horarioTermino: new FormControl('', [Validators.required]),
      tipoAtividade: new FormControl('', [Validators.required]),
      medicosSelecionados: new FormControl()
    });

    this.route.data.pipe(map((res) => res['medicos'])).subscribe({
      next: (medicos) => {
        this.medicosDisponiveis = medicos
      }
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form
      .get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  // validarCheckboxes() {
  //   console.log("fooi");
  //   return (control: FormControl) => {
  //     console.log(control.value.length);
  //     if (control.value.length > 0) {
  //       console.log("trueee");
  //       return true;
  //     }
  //     console.log("falseee");
  //     return false;
  //   };
  // }

  checkboxMarcado(medico: ListarMedicoViewModel, event: any): void {
    if (event.target.checked) {
      this.medicosSelecionados.push(medico);
    }
    else {

      let index = this.medicosSelecionados.indexOf(medico);

      if (index != -1) {
        this.medicosSelecionados.splice(index, 1);
      }
    }

    this.algumMedicoMarcado();

    console.log(this.medicosSelecionados)
  }

  private algumMedicoMarcado() {
    if (this.medicosSelecionados.length == 0) {
      this.medicoFoiSelecionado = false;
    }
    else {
      this.medicoFoiSelecionado = true;
    }
  }

  gravar() {

    this.algumMedicoMarcado();

    let erros = this.form.validate()
    if (this.medicoFoiSelecionado == false) {
      erros.push("É preciso selecionar ao menos um médico")
    }

    if (this.form.invalid || this.medicoFoiSelecionado == false) {
      for (let erro of erros) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.atividadeVM = this.form.value;

    let idsMedicos = []
    for (let medico of this.medicosSelecionados) {
      idsMedicos.push(medico.id)
    }

    this.atividadeVM.medicos = idsMedicos;

    console.log(this.atividadeVM.medicos);

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
