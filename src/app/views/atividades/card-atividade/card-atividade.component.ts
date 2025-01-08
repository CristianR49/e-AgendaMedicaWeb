import { Component, Input, OnInit } from '@angular/core';
import { ListarAtividadeViewModel } from '../models/listar-atividade.view-model';
import { TipoAtividadeEnum } from '../models/TipoAtividadeEnum';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.css']
})
export class CardAtividadeComponent implements OnInit {
  @Input({ required: true }) atividade!: ListarAtividadeViewModel;
  consultaEnum = TipoAtividadeEnum.Consulta;
  medicosString = "Médico(s): ";
  
  ngOnInit(): void {
  }
  
  colocarNomeTipoAtividade(atividadeDoCard : ListarAtividadeViewModel){
    if (+atividadeDoCard.tipoAtividade == 1 ){
      return "Consulta"
    }
    else if(+atividadeDoCard.tipoAtividade == 2 ){
      return "Cirurgia"
    }
    return ""
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

}

