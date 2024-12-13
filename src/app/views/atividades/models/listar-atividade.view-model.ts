import { TipoAtividadeEnum } from "./TipoAtividadeEnum";

export class ListarAtividadeViewModel {
  id: string;
  data: Date
  horarioInicio: String
  horarioTermino: String
  tipoAtividade: TipoAtividadeEnum
  nomesMedicos: string[]

  constructor(id: string, data: Date, horarioInicio: String, horarioTermino: String, tipoAtividade: TipoAtividadeEnum, nomesMedicos: string[]) {
    this.id = id;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.nomesMedicos = nomesMedicos;
  }
}