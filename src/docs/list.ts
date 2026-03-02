export const listDoc = {
  '/lists': {
    get: {
      tags: ['List'],
      summary: 'Listar todas as listas',
      description: 'Retorna todas as listas criadas no sistema',
      responses: {
        '200': {
          description: 'Listas retornadas com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '550e8400-e29b-41d4-a716-446655440000',
                          description: 'ID único da lista (UUID)',

                        },
                        title: {
                          type: 'string',
                          example: 'Minha primeira lista',
                          description: 'Título da lista',
                        },
                        createdAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2026-03-01T10:30:00Z',
                          description: 'Data de criação',
                        },
                        updatedAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2026-03-01T10:30:00Z',
                          description: 'Data de atualização',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Erro ao buscar listas',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Erro ao buscar lists',
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['List'],
      summary: 'Criar nova lista',
      description: 'Cria uma nova lista com o título fornecido',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'Minhas tarefas',
                  description: 'Título da lista a ser criada',
                },
              },
              required: ['title'],
            },
            examples: {
              validRequest: {
                summary: 'Requisição válida',
                value: {
                  title: 'Minhas tarefas',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Lista criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '550e8400-e29b-41d4-a716-446655440000',
                      },
                      title: {
                        type: 'string',
                        example: 'Minhas tarefas',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:30:00Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:30:00Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Erro ao criar lista',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Erro ao criar list',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/lists/{id}': {
    get: {
      tags: ['List'],
      summary: 'Buscar lista por ID',
      description: 'Retorna uma lista específica pelo seu ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
          description: 'ID da lista (UUID)',
        },
      ],
      responses: {
        '200': {
          description: 'Lista retornada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '550e8400-e29b-41d4-a716-446655440000',
                      },
                      title: {
                        type: 'string',
                        example: 'Minhas tarefas',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:30:00Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:30:00Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '404': {
          description: 'Lista não encontrada',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'List não encontrado',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Erro ao buscar lista',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Erro ao buscar list',
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['List'],
      summary: 'Atualizar lista',
      description: 'Atualiza uma lista existente com novas informações',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '1',
          },
          description: 'ID da lista a ser atualizada',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'Minhas tarefas atualizadas',
                  description: 'Novo título da lista',
                },
              },
              required: ['title'],
            },
            examples: {
              validRequest: {
                summary: 'Requisição válida',
                value: {
                  title: 'Minhas tarefas atualizadas',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Lista atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '550e8400-e29b-41d4-a716-446655440000',
                      },
                      title: {
                        type: 'string',
                        example: 'Minhas tarefas atualizadas',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:30:00Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-03-01T10:35:00Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Erro ao atualizar lista',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Erro ao atualizar list',
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['List'],
      summary: 'Deletar lista',
      description: 'Remove uma lista e todas as suas informações',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '1',
          },
          description: 'ID da lista a ser deletada',
        },
      ],
      responses: {
        '200': {
          description: 'Lista deletada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'List deletado com sucesso',
                  },
                },
              },
            },
          },
        },
        '400': {
          description: 'Erro ao deletar lista',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Erro ao deletar list',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};