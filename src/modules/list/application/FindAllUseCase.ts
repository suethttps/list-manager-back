import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class FindAllListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(): Promise<ListResponse[]> {
    try {
      const response = await this.repository.findMany();
      return response;
    } catch (error) {
      throw new Error('Erro ao buscar list');
    }
  }
}