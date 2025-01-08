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
  selector: 'app-editar-atividade',
  templateUrl: './editar-atividade.component.html',
  styleUrls: ['./editar-atividade.component.css'],
})
export class EditarAtividadeComponent implements OnInit {
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

    this.route.data.pipe(map((dados) => dados['atividade'])).subscribe({
      next: (atividade) => this.obterAtividade(atividade),
      error: (erro) => this.processarFalha(erro),
    });

    this.route.data.pipe(map((res) => res['medicos'])).subscribe({
      next: (medicos) => this.armazenarMedicos(medicos)
    });

    this.criarListaDeMarcacao()
  }

  armazenarMedicos(medicos: any){
    this.medicosDisponiveis = medicos
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

    if (typeof this.atividadeVM.tipoAtividade == "string")
      {
        this.atividadeVM.tipoAtividade = (+this.form.value.tipoAtividade) + 1
      }


    if (this.atividadeVM.horarioInicio instanceof Date)
    {
      this.atividadeVM.horarioInicio = this.converterHora(this.form.value.horarioInicio)
    }
    
    if (this.atividadeVM.horarioTermino instanceof Date)
    {
      this.atividadeVM.horarioTermino = this.converterHora(this.form.value.horarioTermino)
    }
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
    let dataConvertida = data.year.toString() + "-" + (data.month).toString().padStart(2, '0') + "-" + data.day.toString() + "T18:19:53.667Z"
    return dataConvertida
  }

  obterAtividade(atividade: FormsAtividadeViewModel) {
    this.atividadeVM = atividade;
    this.form.patchValue(this.atividadeVM);
  }


  gravar2() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }
      return;
    }

    this.atividadeVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    this.atividadeService.editar(id, this.atividadeVM).subscribe({
      next: (atividade) => this.processarSucesso(atividade),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {

    this.corrigirValores()

    this.atividadeService.editar(this.atividadeVM).subscribe({
      next: (atividade: FormsAtividadeViewModel) => this.processarSucesso(atividade),
      error: (err: Error) => this.processarFalha(err),
    });
  }

  processarSucesso(atividade: FormsAtividadeViewModel) {
    this.toastrService.success(
      `A Atividade "${this.colocarNomeTipoAtividade(atividade.tipoAtividade)}" foi cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/atividades/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }

  colocarNomeTipoAtividade(tipoAtividade: any){
      if (+tipoAtividade == 1 ){
        return "Consulta"
      }
      else if(+tipoAtividade == 2 ){
        return "Cirurgia"
      }
      return ""
    }
}
