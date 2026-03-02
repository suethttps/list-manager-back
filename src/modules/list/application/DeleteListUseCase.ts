import { IListRepository } from '../domain/IListRepository';

export class DeleteListUseCase {
  constructor(private repository: IListRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error('Erro ao deletar list');
    }
  }
}
