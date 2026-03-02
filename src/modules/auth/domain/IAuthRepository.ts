import { LoginRequest } from './LoginRequest';
import { LoginResponse } from './LoginResponse';

export interface IAuthRepository {
  login(request: LoginRequest): Promise<LoginResponse>;
  validateToken(token: string): Promise<boolean>;
}
