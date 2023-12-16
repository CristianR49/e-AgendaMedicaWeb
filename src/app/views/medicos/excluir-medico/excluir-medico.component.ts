import { Component, OnInit } from '@angular/core';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { MedicosService } from '../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.css']
})
export class ExcluirMedicoComponent {
medicoVM: VisualizarMedicoViewModel;

  constructor(
    private medicoService: MedicosService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.medicoVM = new VisualizarMedicoViewModel('', '', '');
  }

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['medico'])).subscribe({
      next: (medico) => this.obterMedico(medico),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.medicoService.excluir(this.medicoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterMedico(medico: VisualizarMedicoViewModel) {
    this.medicoVM = medico;
  }

  processarSucesso() {
    this.toastrService.success(
      `O medico foi excluído com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Erro');
  }
}
