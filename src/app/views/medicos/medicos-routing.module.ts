import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarMedicoViewModel } from "./models/listar-medico.view-model";
import { FormsMedicoViewModel } from "./models/forms-medico.view-model";
import { MedicosService } from "./services/medico.service";
import { NgModule, inject } from "@angular/core";
import { VisualizarMedicoViewModel } from "./models/visualizar-medico.view-model";
import { EditarMedicoComponent } from "./editar-medico/editar-medico.component";
import { ExcluirMedicoComponent } from "./excluir-medico/excluir-medico.component";
import { InserirMedicoComponent } from "./inserir-medico/inserir-medico.component";
import { ListarMedicosComponent } from "./listar-medicos/listar-medicos.component";

const listarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicosService).selecionarTodos();
};

const formsMedicoResolver: ResolveFn<FormsMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<VisualizarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicosService).selecionarMedicoCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: 'inserir',
    component: InserirMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicoComponent,
    resolve: { medico: formsMedicoResolver }
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicoComponent,
    resolve: { medico: visualizarMedicoResolver },
  },
  {
    path: 'listar',
    component: ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule { }