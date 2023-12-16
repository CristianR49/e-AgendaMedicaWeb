import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { RouterModule } from '@angular/router';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';


@NgModule({
  declarations: [InserirMedicoComponent, ListarMedicosComponent, CardMedicoComponent, EditarMedicoComponent, ExcluirMedicoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class MedicosModule { }
