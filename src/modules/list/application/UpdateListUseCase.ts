import { ListRequest } from '../domain/ListRequest';
import { ListResponse } from '../domain/ListResponse';
import { IListRepository } from '../domain/IListRepository';

export class UpdateListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(id: string, request: ListRequest): Promise<ListResponse> {
    try {
      const response = await this.repository.update(id, request);
      return response;
    } catch (error) {
      throw new Error('Erro ao atualizar list');
    }
  }
}
