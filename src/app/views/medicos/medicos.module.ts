import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';
import { MedicosRoutingModule } from './medicos-routing.module';
import { MedicosService } from './services/medico.service';


@NgModule({
  declarations: [InserirMedicoComponent, ListarMedicosComponent, CardMedicoComponent, EditarMedicoComponent, ExcluirMedicoComponent],
  imports: [CommonModule, ReactiveFormsModule, MedicosRoutingModule],
  providers: [MedicosService]
})
export class MedicosModule { }
