import { ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarAtividadeViewModel } from "./models/listar-atividade.view-model";
import { AtividadesService } from "./services/atividade.service";
import { NgModule, inject } from "@angular/core";
import { ListarAtividadesComponent } from "./listar-atividades/listar-atividades.component";
import { InserirAtividadeComponent } from "./inserir-atividade/inserir-atividade.component";

const listarAtividadesResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadesService).selecionarTodos();
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtividadesRoutingModule { }