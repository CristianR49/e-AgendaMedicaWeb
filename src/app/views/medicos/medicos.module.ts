import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [InserirMedicoComponent, ListarMedicosComponent, CardMedicoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class MedicosModule { }
