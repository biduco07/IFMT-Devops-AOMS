import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Credenciais {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  /** Emitido com os dados digitados quando o formulário é enviado e está válido. */
  readonly acessar = output<Credenciais>();

  /** Mostra o erro do campo só depois que o usuário interagiu com ele (ou tentou enviar). */
  mostrarErro(campo: keyof Credenciais, erro: string): boolean {
    const control = this.form.controls[campo];
    return control.touched && control.hasError(erro);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.acessar.emit(this.form.getRawValue());
  }
}
