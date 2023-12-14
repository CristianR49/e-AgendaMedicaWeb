export class ListarMedicoViewModel {
  id: string;
  nome: string;
  crm: string;

  constructor(
    id: string,
    nome: string,
    crm: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.crm = crm;
  }
}
