import { ListRequest } from './ListRequest';
import { ListResponse } from './ListResponse';

export interface IListRepository {
  create(request: ListRequest): Promise<ListResponse>;
  findById(id: string): Promise<ListResponse | null>;
  findAll(): Promise<ListResponse[]>;
  findMany?(): Promise<ListResponse[]>;
  update(id: string, request: ListRequest): Promise<ListResponse>;
  delete(id: string): Promise<void>;
}
