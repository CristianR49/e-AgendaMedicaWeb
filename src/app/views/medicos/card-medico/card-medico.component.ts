import { Component, Input } from '@angular/core';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';

@Component({
  selector: 'app-card-medico',
  templateUrl: './card-medico.component.html',
  styleUrls: ['./card-medico.component.css'],
})
export class CardMedicoComponent {
  @Input({ required: true }) medico!: ListarMedicoViewModel;
}
