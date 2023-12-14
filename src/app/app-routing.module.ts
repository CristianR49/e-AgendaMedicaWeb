import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirMedicoComponent } from './views/medicos/inserir-medico/inserir-medico.component';
import { ListarMedicosComponent } from './views/medicos/listar-medicos/listar-medicos.component';
import { ListarMedicoViewModel } from './views/medicos/models/listar-medico.view-model';
import { MedicosService } from './views/medicos/services/medico.service';

const listarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicosService).selecionarTodos();
};

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
  path: 'medicos/inserir',
  component: InserirMedicoComponent,
},
{
  path: 'medicos/listar',
  component: ListarMedicosComponent,
  resolve: {medicos: listarMedicosResolver},
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
