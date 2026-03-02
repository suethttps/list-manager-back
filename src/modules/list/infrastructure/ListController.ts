import { Request, Response } from 'express';
import { ListRepository } from './ListRepository';
import { CreateListUseCase } from '../application/CreateListUseCase';
import { FindByIdListUseCase } from '../application/FindByIdListUseCase';
import { UpdateListUseCase } from '../application/UpdateListUseCase';
import { DeleteListUseCase } from '../application/DeleteListUseCase';


// TODO: Podemos talvez colocar uns bangas para poder rastrear as ações do user tipo logou add excluiu solicitou etc isso pode se estender as rotas e repositorios
export class ListController {
  private createListUseCase: CreateListUseCase;
  private findByIdListUseCase: FindByIdListUseCase;
  private updateListUseCase: UpdateListUseCase;
  private deleteListUseCase: DeleteListUseCase;
  private repository: ListRepository;

  constructor() {
    this.repository = new ListRepository();
    this.createListUseCase = new CreateListUseCase(this.repository);
    this.findByIdListUseCase = new FindByIdListUseCase(this.repository);
    this.updateListUseCase = new UpdateListUseCase(this.repository);
    this.deleteListUseCase = new DeleteListUseCase(this.repository);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.repository.findAll();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao buscar lists',
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.createListUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao criar list',
      });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.findByIdListUseCase.execute(req.params.id as string);
      if (!result) {
        res.status(404).json({
          success: false,
          message: 'List não encontrado',
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
        message: error.message || 'Erro ao buscar list',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.updateListUseCase.execute(req.params.id as string, req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao atualizar list',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteListUseCase.execute(req.params.id as string);
      res.status(200).json({
        success: true,
        message: 'List deletado com sucesso',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Erro ao deletar list',
      });
    }
  }
}
