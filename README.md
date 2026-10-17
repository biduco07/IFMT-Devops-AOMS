# IFMT-Devops-AOMS

Trabalho da disciplina de **DevOps do IFMT** (2024). É uma aplicação **Angular 17** com uma tela de login, publicada automaticamente no **GitHub Pages** por um pipeline do GitHub Actions.

🔗 Site publicado: <https://biduco07.github.io/IFMT-Devops-AOMS/>

## Sobre o projeto

- **Framework:** Angular 17 (componentes standalone)
- **UI:** Angular Material e Tailwind CSS
- **Tela:** formulário de login (`src/app/login`) — apenas a interface, ainda sem autenticação de verdade
- **CI/CD:** GitHub Actions faz o build e publica no GitHub Pages a cada push na `main`

```
src/
├── app/
│   ├── login/            # componente da tela de login
│   ├── app.component.*   # componente raiz (renderiza <app-login>)
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
└── styles.css
.github/workflows/main.yml   # pipeline de build e deploy
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 24 (a mesma versão usada no pipeline)
- npm (já vem com o Node)

## Como rodar localmente

```bash
npm ci        # instala as dependências exatamente como estão no package-lock.json
npm start     # sobe o servidor de desenvolvimento
```

Abra <http://localhost:4200/>. A página recarrega sozinha quando um arquivo é alterado.

## Como gerar o build

```bash
npm run build
```

O build de produção é gerado em `dist/trabalho-facul/browser/`. Para testar esse build localmente:

```bash
npx http-server dist/trabalho-facul/browser
```

> Para simular exatamente o que vai para o GitHub Pages, gere o build com o caminho do site:
> `npx ng build --configuration production --base-href /IFMT-Devops-AOMS/`

## Testes

```bash
npm test
```

Roda os testes unitários com Karma e Jasmine (precisa do Google Chrome instalado).

## Deploy no GitHub Pages

O deploy é **automático**. Não é preciso gerar build nem commitar arquivos compilados.

O workflow [`.github/workflows/main.yml`](.github/workflows/main.yml) funciona assim:

1. **Em todo pull request para a `main` ou para a `dev`:** instala as dependências e roda o build de produção. Se o build quebrar, o PR mostra o erro.
2. **Em todo push na `main`** (por exemplo, ao fazer merge de um PR):
   1. instala as dependências (`npm ci`) com Node 24;
   2. gera o build de produção com `--base-href /IFMT-Devops-AOMS/`, que é o caminho do site no Pages;
   3. envia a pasta `dist/trabalho-facul/browser` como artefato (`actions/upload-pages-artifact`);
   4. publica o artefato no GitHub Pages (`actions/deploy-pages`).

Também dá para disparar o deploy manualmente em **Actions → Build e deploy no GitHub Pages → Run workflow**.

### Configuração necessária (uma vez só)

Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.

O andamento de cada deploy aparece na aba **Actions**, e o link do site aparece no ambiente `github-pages` do repositório.
