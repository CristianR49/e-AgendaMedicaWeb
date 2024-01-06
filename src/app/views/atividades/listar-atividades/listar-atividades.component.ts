import { Component, OnInit } from '@angular/core';
import { ListarAtividadeViewModel } from '../models/listar-atividade.view-model';
import { AtividadesService } from '../services/atividade.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-atividades',
  templateUrl: './listar-atividades.component.html',
  styleUrls: ['./listar-atividades.component.css'],
})
export class ListarAtividadesComponent implements OnInit {
  atividades: ListarAtividadeViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(map((res) => res['atividades'])).subscribe({
      next: (atividades) => this.processarSucesso(atividades)
    });
  }


  processarSucesso(atividades: ListarAtividadeViewModel[]) {
    this.atividades = atividades;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
