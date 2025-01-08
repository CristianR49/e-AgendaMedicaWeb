import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AtividadesService } from '../services/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { TipoAtividadeEnum } from '../models/TipoAtividadeEnum';
import { VisualizarAtividadeViewModel } from '../models/visualizar-atividade.view-model';

@Component({
  selector: 'app-excluir-atividade',
  templateUrl: './excluir-atividade.component.html',
  styleUrl: './excluir-atividade.component.css'
})
export class ExcluirAtividadeComponent {
atividadeVM: VisualizarAtividadeViewModel;

  constructor(
    private atividadeService: AtividadesService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.atividadeVM = new VisualizarAtividadeViewModel("", new Date(), "", "", TipoAtividadeEnum.Cirurgia, new Array());
  }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['atividade'])).subscribe({
      next: (atividade) => this.obterAtividade(atividade),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.atividadeService.excluir(this.atividadeVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterAtividade(atividade: VisualizarAtividadeViewModel) {
    this.atividadeVM = atividade;
  }

  processarSucesso() {
    this.toastrService.success(
      `A atividade foi excluída com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/atividades', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }

  voltarParaAtividades(){
    this.router.navigate(['/atividades', 'listar']);
  }

  encurtarData(data : string){
    let dia = data.slice(8, 10)
    let mes = data.slice(5, 7)
    let ano = data.slice(0, 4)

    return dia + "-" + mes + "-" + ano
  }

  encurtarHora(hora : string){
    return hora.slice(0, -3)
  }

  colocarNomeTipoAtividade(atividade : VisualizarAtividadeViewModel){
      if (+atividade.tipoAtividade == 1 ){
        return "Consulta"
      }
      else if(+atividade.tipoAtividade == 2 ){
        return "Cirurgia"
      }
      return ""
    }
}
