import { ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarAtividadeViewModel } from "./models/listar-atividade.view-model";
import { AtividadesService } from "./services/atividade.service";
import { NgModule, inject } from "@angular/core";
import { ListarAtividadesComponent } from "./listar-atividades/listar-atividades.component";
import { InserirAtividadeComponent } from "./inserir-atividade/inserir-atividade.component";
import { ListarMedicoViewModel } from "../medicos/models/listar-medico.view-model";
import { MedicosService } from "../medicos/services/medico.service";

const listarAtividadesResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadesService).selecionarTodos();
};

const SelecionarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicosService).selecionarTodos();
};

const routes: Routes = [
  {
    path: 'listar',
    component: ListarAtividadesComponent,
    resolve: { atividades: listarAtividadesResolver }
  },
  {
    path: 'inserir',
    component: InserirAtividadeComponent,
    resolve: { medicos: SelecionarMedicosResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtividadesRoutingModule { }