import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarAtividadeViewModel } from "./models/listar-atividade.view-model";
import { AtividadesService } from "./services/atividade.service";
import { NgModule, inject } from "@angular/core";
import { ListarAtividadesComponent } from "./listar-atividades/listar-atividades.component";
import { InserirAtividadeComponent } from "./inserir-atividade/inserir-atividade.component";
import { VisualizarAtividadeViewModel } from "./models/visualizar-atividade.view-model";
import { ExcluirAtividadeComponent } from "./excluir-atividade/excluir-atividade.component";
import { ListarMedicoViewModel } from "../medicos/models/listar-medico.view-model";
import { MedicosService } from "../medicos/services/medico.service";

const listarAtividadesResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadesService).selecionarTodos();
};

const SelecionarAtividadesResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadesService).selecionarTodos();
};

const visualizarAtividadeResolver: ResolveFn<VisualizarAtividadeViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(AtividadesService).selecionarAtividadeCompletoPorId(
    route.paramMap.get('id')!
  );
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
  {
    path: 'excluir/:id',
    component: ExcluirAtividadeComponent,
    resolve: { atividade: visualizarAtividadeResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtividadesRoutingModule { }