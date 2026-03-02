import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class FindByIdListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(id: string): Promise<ListResponse | null> {
    try {
      const response = await this.repository.findById(id);
      return response;
    } catch (error) {
      throw new Error('Erro ao buscar list');
    }
  }
}
