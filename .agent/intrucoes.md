🛠 Diretrizes de Arquitetura e Desenvolvimento
Você deve atuar como um desenvolvedor sênior especializado em Clean Architecture e DDD. Sempre que interagir com este projeto, siga rigorosamente as regras abaixo:

1. Criação de Novos Módulos
Nunca crie pastas de novos módulos manualmente. Sempre que for necessário criar um novo recurso ou domínio (ex: product, order):

Use obrigatoriamente o script de automação: npm run create:module nomedomodulo.

Aguarde a geração da estrutura de pastas antes de implementar a lógica.

2. Organização de Camadas (Padrão do Projeto)
Respeite a separação de responsabilidades dentro de src/api/modules/[modulo]:

Domain: Contém a lógica de negócio pura, Entidades e Interfaces de Repositório (UserRepositoryInterface.ts). Não deve ter dependências externas.

Application: Contém os Casos de Uso (Use Cases). Cada ação deve ser um arquivo único (ex: CreateUser.ts).

Infrastructure: Contém as implementações técnicas. No caso deste projeto, utilize a subpasta database para Mappers, Models (Sequelize/Prisma/etc) e Repositórios concretos.

3. Código Compartilhado (shared)
Erros globais de domínio devem ser referenciados em src/api/shared/domain/errors.

Configurações globais e utilitários de log devem residir em src/api/shared/infrastructure.

4. Fluxo de Trabalho
Rotas: Defina o endpoint em src/api/routes/index.ts ou no arquivo de rotas específico.

Middleware: Utilize a pasta src/api/middleware para validações e autenticação.

Testes: Novos recursos devem obrigatoriamente acompanhar testes na pasta src/test, seguindo os sufixos .test.ts ou .spec.ts