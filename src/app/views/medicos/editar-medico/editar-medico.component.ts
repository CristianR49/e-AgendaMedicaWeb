import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { MedicosService } from '../services/medico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css']
})
export class EditarMedicoComponent {
  form!: FormGroup;
  medicoVM!: FormsMedicoViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicosService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });

    this.route.data.pipe(map((dados) => dados['medico'])).subscribe({
      next: (medico) => this.obterMedico(medico),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    if (this.form.invalid) {
      for (let erro of this.form.validate()) {
        this.toastrService.warning(erro);
      }
      return;
    }

    this.medicoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    this.medicoService.editar(id, this.medicoVM).subscribe({
      next: (medico) => this.processarSucesso(medico),
      error: (erro) => this.processarFalha(erro),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  obterMedico(medico: FormsMedicoViewModel) {
    this.medicoVM = medico;
    this.form.patchValue(this.medicoVM);
  }

  processarSucesso(medico: FormsMedicoViewModel) {
    let nomeEncurtado = this.reduzirTexto(medico.nome)
    this.toastrService.success(
      `O médico "${nomeEncurtado}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  reduzirTexto(texto: string): string {
    let maximo = 25
    if (texto.length > maximo) {
      return texto.substring(0, maximo) + '...';
    } 
    return texto;
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}