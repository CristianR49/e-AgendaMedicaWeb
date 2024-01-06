import { TipoAtividadeEnum } from "./TipoAtividadeEnum";

export class VisualizarAtividadeViewModel {
  id: string;
  nome: string
  data: Date
  horarioInicio: Date
  horarioTermino: Date
  tipoAtividade: TipoAtividadeEnum
  medicosSelecionados: string[]

  constructor(id: string, nome: string, data: Date, horarioInicio: Date, horarioTermino: Date, tipoAtividade: TipoAtividadeEnum, medicosSelecionados: string[]) {
    this.id = id;
    this.nome = nome;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.medicosSelecionados = medicosSelecionados;
  }
}