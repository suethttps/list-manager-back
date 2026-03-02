export const loginDoc = {
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Realizar login de usuário',
      description: 'Autentica um usuário usando email e senha, retornando um token JWT válido por 24 horas.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'usuario@example.com',
                  description: 'Email do usuário registrado',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'senha123',
                  description: 'Senha do usuário',
                },
              },
              required: ['email', 'password'],
            },
            examples: {
              validRequest: {
                summary: 'Requisição válida',
                value: {
                  email: 'usuario@example.com',
                  password: 'senha123',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login realizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    format: 'uuid',
                    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                    description: 'ID único do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'usuario@example.com',
                    description: 'Email do usuário',
                  },
                  name: {
                    type: 'string',
                    example: 'João Silva',
                    description: 'Nome completo do usuário',
                  },
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    description: 'Token JWT válido por 24 horas',
                  },
                },
                required: ['id', 'email', 'name', 'token'],
              },
              examples: {
                success: {
                  summary: 'Resposta bem-sucedida',
                  value: {
                    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                    email: 'usuario@example.com',
                    name: 'João Silva',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Requisição inválida - email ou senha não fornecidos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Email e senha são obrigatórios',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Autenticação falhou - usuário não encontrado ou senha incorreta',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Usuário não encontrado',
                  },
                },
              },
              examples: {
                userNotFound: {
                  summary: 'Usuário não encontrado',
                  value: { error: 'Usuário não encontrado' },
                },
                incorrectPassword: {
                  summary: 'Senha incorreta',
                  value: { error: 'Senha incorreta' },
                },
              },
            },
          },
        },
        '500': {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Erro ao processar login',
                  },
                },
              },
            },
          },
        },
      },
      security: [],
    },
  },
};

