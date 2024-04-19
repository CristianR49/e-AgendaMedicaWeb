import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import '../../extensions/form-group.extension'
import { AtividadesRoutingModule } from './atividades-routing.module';
import { CardAtividadeComponent } from './card-atividade/card-atividade.component';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { AtividadesService } from './services/atividade.service';
import { InserirAtividadeComponent } from './inserir-atividade/inserir-atividade.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MedicosService } from '../medicos/services/medico.service';




@NgModule({
  declarations: [ListarAtividadesComponent, CardAtividadeComponent, InserirAtividadeComponent],
  imports: [CommonModule, ReactiveFormsModule, AtividadesRoutingModule, FormsModule, NgbModule, NgbTimepickerModule, TimepickerModule.forRoot()],
  providers: [AtividadesService, MedicosService]
})
export class AtividadesModule { }
