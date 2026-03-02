import { LoginRequest } from '../domain/LoginRequest';
import { LoginResponse } from '../domain/LoginResponse';
import { IAuthRepository } from '../domain/IAuthRepository';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    // Validação de entrada
    if (!request.email || !request.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
      throw new Error('Email inválido');
    }

    try {
      const response = await this.authRepository.login(request);
      return response;
    } catch (error) {
      throw new Error('Falha na autenticação. Email ou senha incorretos.');
    }
  }
}
