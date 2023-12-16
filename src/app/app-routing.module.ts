import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirMedicoComponent } from './views/medicos/inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './views/medicos/listar-medicos/listar-medicos.component';
import { ListarMedicoViewModel } from './views/medicos/models/listar-medico.view-model';
import { MedicosService } from './views/medicos/services/medico.service';
import { FormsMedicoViewModel } from './views/medicos/models/forms-medico.view-model';
import { EditarMedicoComponent } from './views/medicos/editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './views/medicos/excluir-medico/excluir-medico.component';
import { VisualizarMedicoViewModel } from './views/medicos/models/visualizar-medico.view-model';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'medicos',
    loadChildren: () => import('./views/medicos/medicos.module').then((m) => m.MedicosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
