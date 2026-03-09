import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class FindAllListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(): Promise<ListResponse[]> {
    try {
      // call the repository's findAll method which is guaranteed to exist
      const response = await this.repository.findAll();
      return response;
    } catch (error) {
      throw new Error('Erro ao buscar list');
    }
  }
}