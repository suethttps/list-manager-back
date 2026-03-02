import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { swaggerDocs } from '../../docs';

const swaggerRouter = Router();

// Servir a documentação Swagger
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocs, { explorer: true }));

export default swaggerRouter;
