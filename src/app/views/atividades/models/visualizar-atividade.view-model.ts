import { TipoAtividadeEnum } from "./TipoAtividadeEnum";

export class VisualizarAtividadeViewModel {
  id: string;
  data: Date
  horarioInicio: String
  horarioTermino: String
  tipoAtividade: TipoAtividadeEnum
  medicos: string[]

  constructor(id: string, data: Date, horarioInicio: String, horarioTermino: String, tipoAtividade: TipoAtividadeEnum, medicos: string[]) {
    this.id = id;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.medicos = medicos;
  }
}