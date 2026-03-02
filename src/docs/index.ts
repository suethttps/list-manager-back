import { loginDoc } from './auth';
import { lifeCheckDoc } from './lifecheck';
import { listDoc } from './list';

export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Planning Poker API',
    description: 'API de autenticação e planejamento de poker para equipes ágeis',
    version: '1.0.0',
    contact: {
      name: 'Suporte Técnico',
      email: 'suporte@planningpoker.com',
    },
    license: {
      name: 'MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Servidor local de desenvolvimento',
    },
    {
      url: 'http://localhost:8000',
      description: 'Servidor de produção',
    },
  ],
  paths: {
    ...lifeCheckDoc,
    ...loginDoc,
    ...listDoc,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtido através do login',
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            format: 'password',
          },
        },
        required: ['email', 'password'],
      },
      LoginResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          name: {
            type: 'string',
          },
          token: {
            type: 'string',
          },
        },
        required: ['id', 'email', 'name', 'token'],
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Health',
      description: 'Endpoints de verificação de saúde da API',
    },
    {
      name: 'Auth',
      description: 'Operações de autenticação e autorização',
    },
  ],
};
