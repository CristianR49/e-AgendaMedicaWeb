import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ListarAtividadeViewModel } from '../models/listar-atividade.view-model';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';

@Injectable()
export class AtividadesService {
  private endpoint: string =
    'https://localhost:7287/api/atividades/';

  constructor(private http: HttpClient) { }

  public inserir(atividade: FormsAtividadeViewModel): Observable<FormsAtividadeViewModel> {
    return this.http
      .post<any>(this.endpoint, atividade)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarAtividadeViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
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
