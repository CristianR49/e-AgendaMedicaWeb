import { FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup {
    validate(): string[];
    chamada(): any;
  }
}

FormGroup.prototype.chamada = function () {
  console.log("chamada");
}

FormGroup.prototype.validate = function () {
  const erros: string[] = [];

  for (let campo of Object.keys(this.controls)) {
    const controle = this.get(campo);

    if (!controle?.errors) continue;

    controle.markAsTouched();

    for (let erro of Object.keys(controle.errors)) {
      switch (erro) {
        case 'required':
          erros.push(`O campo "${campo}" é obrigatório!`);
          break;
      }
    }
  }

  return erros;
};
