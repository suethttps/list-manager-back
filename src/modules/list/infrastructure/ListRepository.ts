import { Prisma, PrismaClient } from '../../../../generated/prisma/client';
import { adapter } from '../../../shared/infrastructure/configuration/prismaAdapter';
import { ListRequest } from '../domain/ListRequest';
import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class ListRepository implements IListRepository {
  private prisma: InstanceType<typeof PrismaClient>;
//TODO: O constructor cria uma nova  instance do Prismaclient, podendo acarretar diversas aberturas de conexões com a base de dados, podendo causar leak de memória ou problemas no poll de conexão
//TODO: Validar a possibilidade da criação de uma única instância para ser exportada, limitando a abertura de conexões na base.
  constructor() {
    // Instanciar PrismaClient com o adapter MySQL customizado
    this.prisma = new PrismaClient({ adapter });
  }
// TODO: Validar a possibibilidade da criação de um mapper para o return lists.map sendo executado. Visando evitar a duplicação de lógica
  async findAll(): Promise<ListResponse[]> {
    const lists = await this.prisma.list.findMany();
    return lists.map((list: any) => ({
      id: String(list.id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    }));
  }

  async create(request: ListRequest): Promise<ListResponse> {
    const list: any = await this.prisma.list.create({
      data: {
        title: request.title,
      },
    });
    return {
      id: String(list.id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }

  async findById(id: string): Promise<ListResponse | null> {
    const list: any = await this.prisma.list.findUnique({
      where: { id: (id) },
    });
    if (!list) return null;
    return {
      id: String(list.id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
// TODO: Necessária validação de possibilidade de tratamentos de erros vindos da integração com a DB(PRISMA) para que falhas possam ser validadas.
  async update(id: string, request: ListRequest): Promise<ListResponse> {
    const list: any = await this.prisma.list.update({
      where: { id: (id) },
      data: {
        title: request.title,
      },
    });
    return {
      id: String(list.id),
      title: list.title,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.list.delete({
      where: { id: (id) },
    });
  }
}
