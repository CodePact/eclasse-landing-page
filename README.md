# EClasse — landing page

Reconstrução da página capturada em `eclasse.codepact.com.br`, com Next.js App Router. O HTML e os arquivos em `_next/static` são o snapshot original usado como referência; não são o código-fonte restaurado.

## Desenvolvimento

Instale as dependências com `npm install`, inicie com `npm run dev` e gere a versão de produção com `npm run build` / `npm start`.

Os assets estáticos ficam em `public/assets/` e são servidos por `/assets/<nome>`. Inclua essa pasta no deploy. A aplicação não depende de arquivos do snapshot `_next`.

## Formulário de leads (placeholder)

Contrato proposto: `POST /api/leads`, `Content-Type: application/json`, corpo `{ "name": "Nome", "email": "nome@escola.com.br", "phone": "(11) 99999-9999" }`.

- `400`: JSON inválido ou campos fora da validação.
- `503`: dados válidos, mas a captura ainda não está integrada e nenhum lead foi gravado.

A rota valida os dados e não registra nem persiste informações pessoais. Antes de ativar a captura, substitua a resposta `503` por uma integração de servidor com o backend aprovado pela CodePact; não coloque tokens de serviço no navegador. A interface avisa que o envio não está ativo.

O GTM `GTM-NZ3JV69F` e a verificação de domínio do Facebook foram preservados conforme solicitado. Revise consentimento de cookies e regras de privacidade antes de publicar.
