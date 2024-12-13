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

  medicosSelecionados: string[] = [];
  algumMedicoFoiSelecionado: boolean = true;
  ehConsulta: boolean = false
  maximoDeMedicosMarcadosConsulta: boolean = false
  checkboxMedicofoiMarcado: boolean = false
  caixasDeSelecao: { marcado: boolean }[] = []

  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadesService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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

    this.criarListaDeMarcacao()
  }

  criarListaDeMarcacao(){
    for(let i = 0; i < this.medicosDisponiveis.length; i++){
      this.caixasDeSelecao.push(
        { marcado: false }
      )
    }
  }

  campoEstaInvalido(nome: string) {
    return this.form
      .get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  verificarSeEhConsulta(event: any) {
    if (event.target.value == 0){
      this.ehConsulta = true
      
      this.desmarcarMedicos()
    }
    else{
      this.ehCirurgia()
          
    }
  }

  ehCirurgia(){
    this.ehConsulta = false
    this.ativarCheckboxesMedicos()
  }

  ativarCheckboxesMedicos(){
    for (let i = 0; i < document.getElementsByName("checkboxMedico").length; i++){
      let checkbox = document.getElementsByName("checkboxMedico")[i] as HTMLInputElement;
      checkbox.disabled = false;
    }
  }

  desmarcarMedicos(){
    for (let i = 0; i < document.getElementsByName("checkboxMedico").length; i++){
      let checkbox = document.getElementsByName("checkboxMedico")[i] as HTMLInputElement;
      checkbox.checked = false;
      this.caixasDeSelecao[i].marcado = false
    }
    this.medicosSelecionados.splice(0, this.medicosSelecionados.length)
  }

  checkboxMedicoMarcado(medico: ListarMedicoViewModel, event: any): void {
    if (event.target.checked) {
      this.medicosSelecionados.push(medico.id);
    }
    else {

      let index = this.medicosSelecionados.indexOf(medico.id);

      if (index != -1) {
        this.medicosSelecionados.splice(index, 1);
      }
    }

    this.atualizarChecagens()
  }
  atualizarChecagens(){
    this.algumMedicoFoiSelecionado = this.medicosSelecionados.length != 0
    this.maximoDeMedicosMarcadosConsulta = this.algumMedicoFoiSelecionado && this.ehConsulta
  }


  deveEstarDesabilitado(indice: number): boolean {
    return !this.caixasDeSelecao[indice].marcado && this.maximoDeMedicosMarcadosConsulta;
  }


  aoMudarCheckbox(event: Event, medico: ListarMedicoViewModel, indice: number): void {
    this.checkboxMedicoMarcado(medico, event)
    const checkbox = event.target as HTMLInputElement;


    this.caixasDeSelecao[indice].marcado = checkbox.checked;
  }


  corrigirMedicos(){
    this.algumMedicoFoiSelecionado = this.medicosSelecionados.length != 0

    let erros = this.form.validate()
    if (this.algumMedicoFoiSelecionado == false) {
      erros.push("É preciso selecionar ao menos um médico")
    }

    if (this.form.invalid || this.algumMedicoFoiSelecionado == false) {
      for (let erro of erros) {
        this.toastrService.warning(erro);
      }

      return true;
    }
    return false
  }

  corrigirValores(){

    if (this.corrigirMedicos())
    {
      return
    }

    this.atividadeVM = this.form.value;

    this.atividadeVM.medicosSelecionados = this.medicosSelecionados;

    this.atividadeVM.tipoAtividade = (+this.atividadeVM.tipoAtividade) + 1

    if (this.atividadeVM.horarioInicio instanceof Date)
    {
      this.atividadeVM.horarioInicio = this.converterHora(this.form.value.horarioInicio)
    }
    
    if (this.atividadeVM.horarioTermino instanceof Date)
    {
      this.atividadeVM.horarioTermino = this.converterHora(this.form.value.horarioTermino)
    }
    console.log(this.atividadeVM.data)
    if (typeof this.atividadeVM.data !== "string")
    {
      this.atividadeVM.data = this.converterData(this.form.value.data)
    }
  }

  converterHora(horario: Date){
    let hours = horario.getHours().toString().padStart(2, '0');
    let minutes = horario.getMinutes().toString().padStart(2, '0');
    let seconds = horario.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  converterData(data: any){
    let dataConvertida = data.year.toString() + "-" + (data.month - 1).toString() + "-" + data.day.toString()
    return dataConvertida
  }

  gravar() {

    this.corrigirValores()

    this.atividadeService.inserir(this.atividadeVM).subscribe({
      next: (atividade: FormsAtividadeViewModel) => this.processarSucesso(atividade),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(atividade: FormsAtividadeViewModel) {
    this.toastrService.success(
      `A Atividade "${atividade.tipoAtividade}" foi cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/atividades/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
