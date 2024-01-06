import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';

@Injectable()
export class MedicosService {
  private endpoint: string =
    'https://localhost:7287/api/medicos/';

  constructor(private http: HttpClient) { }

  public inserir(medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http
      .post<any>(this.endpoint, medico)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, medico: FormsMedicoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, medico)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public excluir(id: string): Observable<any> {
    return this.http
      .delete(this.endpoint + id)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsMedicoViewModel> {
    return this.http
      .get<any>(this.endpoint + "visualizacao-completa/" + id)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarMedicoCompletoPorId(
    id: string
  ): Observable<VisualizarMedicoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id
      )
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.[0].message;



    return throwError(() => new Error(mensagemErro));
  }
}
