import { TipoAtividadeEnum } from "./TipoAtividadeEnum";

export class ListarAtividadeViewModel {
  id: string;
  nome: string
  data: Date
  horarioInicio: Date
  horarioTermino: Date
  tipoAtividade: TipoAtividadeEnum
  nomesMedicos: string[]

  constructor(id: string, nome: string, data: Date, horarioInicio: Date, horarioTermino: Date, tipoAtividade: TipoAtividadeEnum, nomesMedicos: string[]) {
    this.nome = nome;
    this.id = id;
    this.data = data;
    this.horarioInicio = horarioInicio;
    this.horarioTermino = horarioTermino;
    this.tipoAtividade = tipoAtividade;
    this.nomesMedicos = nomesMedicos;
  }
}