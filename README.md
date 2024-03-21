**IFMT-Devops-AOMS**

**Gerando um build**
Para gerar um build, insira no terminal "ng build --configuration production",é gerado uma pasta dist com a imagem do seu projeto. Ao instalar o node vem com ele um npx, para poder rodar o pacote.
Insira no terminal "npx http-serve dist/"nome do projeto", para levantar no localhost a imagem do seu projeto.

Para facilitar, crie um script no package.json = "deploy:ghdocs": "ng build --configuration production --output-path docs --base-href /"nome do projeto"/"
Ao rodar npm run deploy:ghdocs, ele gera uma pasta docs com o build, o href fica com o nome do projeto.

Após isso apenas dar commit e dar push para o main.
 

**Configurando git pages**
Para configurar o gitpages seleciona a branch main e /docs, a pasta da imagem do projeto. Ao entrar na url criada já inicializa o projeto.


**Automatizando o deploy**
Para automatizar utilize a biblioteca angular-cli-ghpages, adicionando ela com o comando: ng add angular-cli-ghpages.

No arquivo angular.json, na opção chamada deploy no arquivo, adicione dentro de "options" o "baseHref": "/"nome do projeto"/".

No terminal insera ng deploy, ele já roda o build production e o base href. Ele cria um git a branch gh-pages e faz o (commit e push) automaticamente.

No github pages altere a branch da main para branch gh-pages e a pasta /root, ao salvar o local continua o mesmo, porém ao dar o comando "ng deploy" já sobe automaticamente para o git pages.