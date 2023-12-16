import { Component, OnInit } from '@angular/core';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { MedicosService } from '../services/medico.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css'],
})
export class ListarMedicosComponent implements OnInit {
  medicos: ListarMedicoViewModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private medicosService: MedicosService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((res) => res['medicos'])).subscribe({
      next: (medicos) => 
      {
        this.obterMedicos(medicos);
      }
    });
  }


  obterMedicos(medicos: ListarMedicoViewModel[]) {
    this.medicos = medicos;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
