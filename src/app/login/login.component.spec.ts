import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Credenciais, LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  function preencher(id: string, valor: string): void {
    const input = el.querySelector<HTMLInputElement>(`#${id}`)!;
    input.value = valor;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  function enviar(): void {
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  function textoDoErro(campo: string): string | undefined {
    return el.querySelector(`#erro-${campo}`)?.textContent?.trim();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve começar com o formulário vazio, inválido e sem mensagens de erro', () => {
    expect(component.form.getRawValue()).toEqual({ email: '', senha: '' });
    expect(component.form.invalid).toBe(true);
    expect(el.querySelectorAll('.erro').length).toBe(0);
  });

  it('deve exigir e-mail e senha', () => {
    expect(component.form.controls.email.hasError('required')).toBe(true);
    expect(component.form.controls.senha.hasError('required')).toBe(true);
  });

  it('deve recusar um e-mail em formato inválido', () => {
    component.form.controls.email.setValue('pedro');
    expect(component.form.controls.email.hasError('email')).toBe(true);

    component.form.controls.email.setValue('pedro@ifmt.edu.br');
    expect(component.form.controls.email.valid).toBe(true);
  });

  it('deve mostrar os erros de campo obrigatório ao enviar o formulário vazio', () => {
    enviar();

    expect(textoDoErro('email')).toBe('Informe o seu e-mail.');
    expect(textoDoErro('senha')).toBe('Informe a sua senha.');
  });

  it('deve mostrar o erro de e-mail inválido depois que o usuário sai do campo', () => {
    preencher('email', 'pedro');

    expect(textoDoErro('email')).toBe('Informe um e-mail válido.');
    expect(textoDoErro('senha')).toBeUndefined();
  });

  it('deve esconder a mensagem de erro quando o campo é corrigido', () => {
    enviar();
    expect(textoDoErro('email')).toBeDefined();

    preencher('email', 'pedro@ifmt.edu.br');
    preencher('password', '123456');

    expect(el.querySelectorAll('.erro').length).toBe(0);
  });

  it('não deve emitir o evento acessar com o formulário inválido', () => {
    const emitidos: Credenciais[] = [];
    component.acessar.subscribe((c) => emitidos.push(c));

    preencher('email', 'pedro');
    preencher('password', '123456');
    enviar();

    expect(emitidos).toEqual([]);
  });

  it('deve emitir as credenciais ao enviar o formulário válido', () => {
    const emitidos: Credenciais[] = [];
    component.acessar.subscribe((c) => emitidos.push(c));

    preencher('email', 'pedro@ifmt.edu.br');
    preencher('password', '123456');
    enviar();

    expect(emitidos).toEqual([{ email: 'pedro@ifmt.edu.br', senha: '123456' }]);
  });

  it('deve associar cada label ao seu campo', () => {
    for (const label of Array.from(el.querySelectorAll('label'))) {
      expect(el.querySelector(`#${label.htmlFor}`)).not.toBeNull();
    }
  });
});
