import { Component, Input } from '@angular/core';
import { ListarAtividadeViewModel } from '../models/listar-atividade.view-model';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.css']
})
export class CardAtividadeComponent {
  @Input({ required: true }) atividade!: ListarAtividadeViewModel;
}
