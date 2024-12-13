import { TipoAtividadeEnum } from "./TipoAtividadeEnum"

export class FormsAtividadeViewModel {
  data: string
  horarioInicio: String
  horarioTermino: String
  tipoAtividade: number
  medicosSelecionados: string[]

  constructor(data: string, horarioInicio: String, horarioTermino: String, tipoAtividade: number, medicosSelecionados: string[]) {
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.medicosSelecionados = medicosSelecionados;
  }
}