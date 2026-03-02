#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Error: Module name is required');
  console.log('Usage: node create-module.js <ModuleName>');
  process.exit(1);
}

const modulePath = path.join(__dirname, '../src/modules', moduleName.toLowerCase());

// Create directory structure
const directories = [
  'domain',
  'application',
  'infrastructure',
];

directories.forEach(dir => {
  const dirPath = path.join(modulePath, dir);
  fs.mkdirSync(dirPath, { recursive: true });
});

// Pascal case module name
const pascalCaseName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

// Create files with basic structure (based on auth module pattern)
const files = [
  // Domain layer files
  {
    path: `domain/I${pascalCaseName}Repository.ts`,
    content: `import { ${pascalCaseName}Request } from './${pascalCaseName}Request';
import { ${pascalCaseName}Response } from './${pascalCaseName}Response';

export interface I${pascalCaseName}Repository {
  create(request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response>;
  findById(id: string): Promise<${pascalCaseName}Response | null>;
  update(id: string, request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response>;
  delete(id: string): Promise<void>;
}
`
  },
  {
    path: `domain/${pascalCaseName}Request.ts`,
    content: `export interface ${pascalCaseName}Request {
  // Define your request properties here
  id?: string;
}
`
  },
  {
    path: `domain/${pascalCaseName}Response.ts`,
    content: `export interface ${pascalCaseName}Response {
  // Define your response properties here
  id: string;
}
`
  },
  // Application layer files
  {
    path: `application/Create${pascalCaseName}UseCase.ts`,
    content: `import { ${pascalCaseName}Request } from '../domain/${pascalCaseName}Request';
import { ${pascalCaseName}Response } from '../domain/${pascalCaseName}Response';
import { I${pascalCaseName}Repository } from '../domain/I${pascalCaseName}Repository';

export class Create${pascalCaseName}UseCase {
  constructor(private repository: I${pascalCaseName}Repository) {}

  async execute(request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response> {
    try {
      const response = await this.repository.create(request);
      return response;
    } catch (error) {
      throw new Error('Erro ao criar ${moduleName.toLowerCase()}');
    }
  }
}
`
  },
  {
    path: `application/FindById${pascalCaseName}UseCase.ts`,
    content: `import { ${pascalCaseName}Response } from '../domain/${pascalCaseName}Response';
import { I${pascalCaseName}Repository } from '../domain/I${pascalCaseName}Repository';

export class FindById${pascalCaseName}UseCase {
  constructor(private repository: I${pascalCaseName}Repository) {}

  async execute(id: string): Promise<${pascalCaseName}Response | null> {
    try {
      const response = await this.repository.findById(id);
      return response;
    } catch (error) {
      throw new Error('Erro ao buscar ${moduleName.toLowerCase()}');
    }
  }
}
`
  },
  {
    path: `application/Update${pascalCaseName}UseCase.ts`,
    content: `import { ${pascalCaseName}Request } from '../domain/${pascalCaseName}Request';
import { ${pascalCaseName}Response } from '../domain/${pascalCaseName}Response';
import { I${pascalCaseName}Repository } from '../domain/I${pascalCaseName}Repository';

export class Update${pascalCaseName}UseCase {
  constructor(private repository: I${pascalCaseName}Repository) {}

  async execute(id: string, request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response> {
    try {
      const response = await this.repository.update(id, request);
      return response;
    } catch (error) {
      throw new Error('Erro ao atualizar ${moduleName.toLowerCase()}');
    }
  }
}
`
  },
  {
    path: `application/Delete${pascalCaseName}UseCase.ts`,
    content: `import { I${pascalCaseName}Repository } from '../domain/I${pascalCaseName}Repository';

export class Delete${pascalCaseName}UseCase {
  constructor(private repository: I${pascalCaseName}Repository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar ${moduleName.toLowerCase()}');
    }
  }
}
`
  },
  // Infrastructure layer files
  {
    path: `infrastructure/${pascalCaseName}Controller.ts`,
    content: `import { Request, Response } from 'express';
import { ${pascalCaseName}Repository } from './${pascalCaseName}Repository';
import { Create${pascalCaseName}UseCase } from '../application/Create${pascalCaseName}UseCase';
import { FindById${pascalCaseName}UseCase } from '../application/FindById${pascalCaseName}UseCase';
import { Update${pascalCaseName}UseCase } from '../application/Update${pascalCaseName}UseCase';
import { Delete${pascalCaseName}UseCase } from '../application/Delete${pascalCaseName}UseCase';

export class ${pascalCaseName}Controller {
  private create${pascalCaseName}UseCase: Create${pascalCaseName}UseCase;
  private findById${pascalCaseName}UseCase: FindById${pascalCaseName}UseCase;
  private update${pascalCaseName}UseCase: Update${pascalCaseName}UseCase;
  private delete${pascalCaseName}UseCase: Delete${pascalCaseName}UseCase;
  private repository: ${pascalCaseName}Repository;

  constructor() {
    this.repository = new ${pascalCaseName}Repository();
    this.create${pascalCaseName}UseCase = new Create${pascalCaseName}UseCase(this.repository);
    this.findById${pascalCaseName}UseCase = new FindById${pascalCaseName}UseCase(this.repository);
    this.update${pascalCaseName}UseCase = new Update${pascalCaseName}UseCase(this.repository);
    this.delete${pascalCaseName}UseCase = new Delete${pascalCaseName}UseCase(this.repository);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.create${pascalCaseName}UseCase.execute(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao criar ${moduleName.toLowerCase()}',
      });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.findById${pascalCaseName}UseCase.execute(req.params.id);
      if (!result) {
        res.status(404).json({
          success: false,
          message: '${pascalCaseName} não encontrado',
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao buscar ${moduleName.toLowerCase()}',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.update${pascalCaseName}UseCase.execute(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao atualizar ${moduleName.toLowerCase()}',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.delete${pascalCaseName}UseCase.execute(req.params.id);
      res.status(200).json({
        success: true,
        message: '${pascalCaseName} deletado com sucesso',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao deletar ${moduleName.toLowerCase()}',
      });
    }
  }
}
`
  },
  {
    path: `infrastructure/${pascalCaseName}Repository.ts`,
    content: `import { Prisma, PrismaClient } from ''../../../../generated/prisma/client';
import { adapter } from '../../../shared/infrastructure/configuration/prismaAdapter';
import { ${pascalCaseName}Request } from '../domain/${pascalCaseName}Request';
import { ${pascalCaseName}Response } from '../domain/${pascalCaseName}Response';
import { I${pascalCaseName}Repository } from '../domain/I${pascalCaseName}Repository';

export class ${pascalCaseName}Repository implements I${pascalCaseName}Repository {
  private prisma: InstanceType<typeof PrismaClient>;

  constructor() {
    // Instanciar PrismaClient com o adapter PostgreSQL customizado
    this.prisma = new PrismaClient({ adapter });
  }

  async create(request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response> {
    // TODO: Implementar lógica de criação
    throw new Error('Método create não implementado');
  }

  async findById(id: string): Promise<${pascalCaseName}Response | null> {
    // TODO: Implementar lógica de busca por ID
    throw new Error('Método findById não implementado');
  }

  async update(id: string, request: ${pascalCaseName}Request): Promise<${pascalCaseName}Response> {
    // TODO: Implementar lógica de atualização
    throw new Error('Método update não implementado');
  }

  async delete(id: string): Promise<void> {
    // TODO: Implementar lógica de deleção
    throw new Error('Método delete não implementado');
  }
}
`
  },
];

files.forEach(file => {
  const filePath = path.join(modulePath, file.path);
  fs.writeFileSync(filePath, file.content);
});

console.log(`✅ Module "${moduleName}" created successfully at ${modulePath}`);
console.log('\n📁 Created structure:');
directories.forEach(dir => {
  console.log(`  src/modules/${moduleName.toLowerCase()}/${dir}/`);
});

console.log('\n📄 Created files:');
files.forEach(file => {
  console.log(`  src/modules/${moduleName.toLowerCase()}/${file.path}`);
});