export const lifeCheckDoc = {
  '/life-check': {
    get: {
      tags: ['Health'],
      summary: 'Verificar status da API',
      description: 'Endpoint para verificar se a API está ativa e funcionando corretamente.',
      responses: {
        '200': {
          description: 'API está ativa e funcionando',
          content: {
            'text/plain': {
              schema: {
                type: 'string',
                example: 'On, API 💎',
              },
            },
          },
        },
      },
      security: [],
    },
  },
};