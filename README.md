# EClasse — landing page

Reconstrução da página capturada em `eclasse.codepact.com.br`, com Next.js App Router. O HTML e os arquivos em `_next/static` são o snapshot original usado como referência; não são o código-fonte restaurado.

## Desenvolvimento

Instale as dependências com `npm install`, inicie com `npm run dev` e gere a versão de produção com `npm run build` / `npm start`.

Os assets estáticos ficam em `public/assets/` e são servidos por `/assets/<nome>`. Inclua essa pasta no deploy. A aplicação não depende de arquivos do snapshot `_next`.

## Formulário de contato

Contrato proposto: `POST /api/leads`, `Content-Type: application/json`, corpo `{ "name": "Nome", "email": "nome@escola.com.br", "phone": "(11) 99999-9999" }`.

- `400`: JSON inválido ou campos fora da validação.
- `502`: falha no serviço de e-mail.
- `503`: serviço ou destinatário não configurado.
- `504`: timeout do serviço de e-mail.
- `200`: e-mail enviado com sucesso.

Configure as credenciais somente no servidor e nunca como `NEXT_PUBLIC_*`:

- `RESEND_API_KEY`: chave da API Resend.
- `CONTACT_EMAIL` ou `ECLASSE_CONTACT_EMAIL`: destinatário dos contatos.
- `EMAIL_FROM`: remetente autorizado no provedor (opcional).

A rota valida e sanitiza os dados antes do envio e não os registra nem persiste. O serviço usa timeout de 10 segundos e falhas são registradas sem incluir dados pessoais. O botão é bloqueado enquanto o envio está em processamento.

O GTM `GTM-NZ3JV69F` e a verificação de domínio do Facebook foram preservados conforme solicitado. Revise consentimento de cookies e regras de privacidade antes de publicar.
