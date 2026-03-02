import { ListRequest } from '../domain/ListRequest';
import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class CreateListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(request: ListRequest): Promise<ListResponse> {
    try {
      const response = await this.repository.create(request);
      return response;
    } catch (error) {
      throw new Error('Erro ao criar list');
    }
  }
}
