import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';

@Injectable()
export class MedicosService {
  private endpoint: string =
    'https://localhost:7287/api/medicos';

  constructor(private http: HttpClient) {}

  public inserir(
    medico: FormsMedicoViewModel
  ): Observable<FormsMedicoViewModel> {
    return this.http
      .post<any>(this.endpoint, medico, /*this.obterHeadersAutorizacao()*/)
      .pipe(
        map((res) => res.dados),
        // Interceptar e tratar a mensagem de erro
        //catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res),
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
    else mensagemErro = erro.error?.erros?.[0] || 'Erro desconhecido';

    return throwError(() => new Error(mensagemErro));
  }
}
