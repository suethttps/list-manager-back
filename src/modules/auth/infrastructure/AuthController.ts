import { Request, Response } from 'express';
import { LoginUseCase } from '../application/LoginUseCase';
import { AuthRepository } from './AuthRepository';

export class AuthController {
  private loginUseCase: LoginUseCase;
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.loginUseCase = new LoginUseCase(this.authRepository);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this.loginUseCase.execute({ email, password });
      console.log('Login successful for user:', email);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.log('Login failed:', error.message);
      res.status(401).json({
        success: false,
        message: error.message || 'Erro na autenticação',
      });
    }
  }
}
