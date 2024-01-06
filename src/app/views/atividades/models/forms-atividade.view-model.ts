import { TipoAtividadeEnum } from "./TipoAtividadeEnum"

export class FormsAtividadeViewModel {
  nome: string
  data: Date
  horarioInicio: Date
  horarioTermino: Date
  tipoAtividade: TipoAtividadeEnum
  medicos: string[]

  constructor(nome: string, data: Date, horarioInicio: Date, horarioTermino: Date, tipoAtividade: TipoAtividadeEnum, medicos: string[]) {
    this.nome = nome;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.medicos = medicos;
  }
}