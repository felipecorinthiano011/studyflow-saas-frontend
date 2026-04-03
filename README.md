# StudyFlow Frontend

## Repositórios do Projeto

| Parte | Repositório |
|-------|-------------|
| **Backend** (Java Spring Boot) | [felipecorinthiano011/studyflow-saas](https://github.com/felipecorinthiano011/studyflow-saas) |
| **Frontend** (Angular + Tailwind) | [felipecorinthiano011/studyflow-saas-frontend](https://github.com/felipecorinthiano011/studyflow-saas-frontend) |

---

## Descrição

Frontend do **StudyFlow** — SaaS de estudo e aprendizado.  
Desenvolvido com **Angular** e **Tailwind CSS**, consome a API REST do backend com autenticação via **JWT**.

> **A partir da Semana 4**, o desenvolvimento conta com o suporte do **Claude (Anthropic)** como agente de IA.

---

## Como rodar

### Pré-requisitos
- Node.js 18+
- Backend rodando em `http://localhost:8080` ([ver repositório do backend](https://github.com/felipecorinthiano011/studyflow-saas))

### Instalar dependências
```bash
npm install
```

### Rodar em desenvolvimento
```bash
npx ng serve
```

Acesse: `http://localhost:4200`

---

## Tecnologias

- Angular 21
- Tailwind CSS v4
- TypeScript
- RxJS

---

## Plano de desenvolvimento — 8 semanas

### Semana 6 (Atual)
- Setup do projeto Angular + Tailwind
- AuthService com login e token JWT no localStorage
- Interceptor HTTP que injeta Bearer token automaticamente
- AuthGuard protegendo rotas autenticadas
- Página de login
- Página de listagem e criação de study items

### Semana 7
- CRUD completo no front-end
- Finalizar autenticação JWT
- Ajustar estilo com Tailwind

### Semana 8
- Refatoração e revisão de segurança
- Documentação final
- Deploy inicial (AWS / Docker)
