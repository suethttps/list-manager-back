# ListManager API - Backend

> API Backend para gerenciamento de listas desenvolvida em Node.js com Clean Architecture e DDD

Este projeto é o backend de uma aplicação de gerenciamento de tarefas, desenvolvido com as melhores práticas de arquitetura clean, separação de responsabilidades e padrões de desenvolvimento modernos.

## 📋 Sobre o Projeto

O ListManager API é uma aplicação robusta e escalável que fornece endpoints para gerenciamento de listas. O backend foi construído com tecnologias modernas como Node.js, Express, TypeScript e Prisma, seguindo os padrões de Clean Architecture e Domain-Driven Design (DDD).

## 🛠 Stack Tecnológico

### Back-end
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework Web**: [Express.js](https://expressjs.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Container**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Documentação API**: [Swagger/OpenAPI](https://swagger.io/)
- **Testes**: [Jest](https://jestio.io/)

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repo>
cd list-manager-back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env-example .env
```

4. Inicie o PostgreSQL com Docker Compose:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor iniciará em `http://localhost:8000`

### Comandos Disponíveis

```bash
npm run dev              # Inicia o servidor em modo desenvolvimento
npm test                 # Executa os testes
npm run build            # Compila o TypeScript
npm run start            # Inicia o servidor em modo produção
npx prisma migrate dev   # Cria e aplica migrações do banco
npx prisma studio       # Abre a interface de gerenciamento do banco
npm run create:module    # Cria um novo módulo
```

## 📚 Documentação da API

A documentação interativa da API está disponível no **Swagger/OpenAPI**:

### Acessar Swagger
- URL: [http://localhost:8000/docs](http://localhost:8000/docs)
- Ambiente: Desenvolvimento (localhost:8000)

A documentação inclui:
- ✅ Todos os endpoints disponíveis
- ✅ Descrição de request e response
- ✅ Exemplos de requisições
- ✅ Códigos de status HTTP
- ✅ Teste de APIs diretamente no Swagger UI

### Endpoints Principais

#### Listas
- `GET /lists` - Listar todas as listas
- `POST /lists` - Criar nova lista
- `GET /lists/{id}` - Buscar lista por ID
- `PUT /lists/{id}` - Atualizar lista
- `DELETE /lists/{id}` - Deletar lista

#### Autenticação
- `POST /login` - Realizar login

#### Health Check
- `GET /life-check` - Verificar status da API

## 🏗 Arquitetura

Este projeto segue a **Clean Architecture** e **Domain-Driven Design (DDD)**:

### Estrutura de Camadas

```
src/
├── api/
│   ├── middleware/        # Middlewares (autenticação, validação)
│   ├── routes/           # Definição de rotas
│   └── shared/           # Código compartilhado
├── modules/              # Módulos do sistema
│   ├── auth/            # Módulo de autenticação
│   │   ├── application/ # Use Cases
│   │   ├── domain/      # Entidades e Interfaces
│   │   └── infrastructure/ # Implementações técnicas
│   └── list/            # Módulo de listas
│       ├── application/
│       ├── domain/
│       └── infrastructure/
├── docs/                 # Documentação Swagger
└── test/                 # Testes

## 📝 Padrões de Desenvolvimento

### Conventional Commits

Este projeto segue a convenção de commits padronizada:

```
<tipo>(<escopo>): <descrição>
```

#### Tipos de Commit

- **feat**: Novas funcionalidades
- **fix**: Correção de bugs
- **chore**: Tarefas de manutenção
- **docs**: Alterações na documentação
- **style**: Formatação de código
- **refactor**: Refatoração
- **test**: Testes
- **ci**: Configuração de CI/CD

### Criação de Novos Módulos

Use o script de automação para criar novos módulos com a estrutura correta:

```bash
npm run create:module nomedomodulo
```

Isso criará automaticamente a estrutura de pastas respeitando Clean Architecture e DDD.

### Padrão de Branches

| Branch | Propósito |
|--------|-----------|
| `main` | Código pronto para produção |
| `develop` | Desenvolvimento |
| `feature/<nome>` | Novas funcionalidades |
| `fix/<nome>` | Correção de bugs |

## 🗄 Banco de Dados

### PostgreSQL com Docker

O banco de dados é gerenciado via Docker Compose com volume persistente:

```yaml
services:
  postgres:
    image: postgres:17
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Gerenciar Banco com Prisma Studio

```bash
npx prisma studio
```

Abre uma interface web para visualizar e editar dados do banco.

## 🧪 Testes

Os testes são organizados na pasta `src/test` e seguem os sufixos `.test.ts` ou `.spec.ts`:

```bash
npm test                    # Executa todos os testes
npm test -- --watch        # Modo watch
```

## 🔧 Troubleshooting

### Erro de conexão com banco de dados
```bash
# Verifique se o Docker está rodando
docker-compose ps

# Reinicie os serviços
docker-compose down
docker-compose up -d
```

### Erro de tipos do Prisma
```bash
# Regenere os tipos
npx prisma generate
```

## 📄 Licença

MIT
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b fix/corrigir-bug
   ```

3. **Merge em develop**: Após conclusão, crie um Pull Request para merge em `develop`

4. **Merge em master**: Apenas código testado e aprovado em `develop` vai para `master`

## 🛠️ Stack Tecnológico

- **Next.js 16.1.6** - Framework React com SSR
- **React 19.2.3** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Lucide React** - Ícones

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

## 📄 Licença

Este projeto é desenvolvido para fins educacionais na disciplina de Fundamentos de DevOps.
