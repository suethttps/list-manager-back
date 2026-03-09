import { ListRequest } from './ListRequest';
import { ListResponse } from './ListResponse';

export interface IListRepository {
  create(request: ListRequest): Promise<ListResponse>;
  findById(id: string): Promise<ListResponse | null>;
  findAll(): Promise<ListResponse[]>;
  // removed optional findMany since findAll covers the same functionality
  update(id: string, request: ListRequest): Promise<ListResponse>;
  delete(id: string): Promise<void>;
}
