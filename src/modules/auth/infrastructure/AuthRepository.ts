import { Prisma, PrismaClient } from '../../../../generated/prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { adapter } from '../../../shared/infrastructure/configuration/prismaAdapter';
import { LoginRequest } from '../domain/LoginRequest';
import { LoginResponse } from '../domain/LoginResponse';
import { IAuthRepository } from '../domain/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private prisma: InstanceType<typeof PrismaClient>;
  private jwtSecret: string;

  constructor() {
    // Instanciar PrismaClient com o adapter PostgreSQL customizado
    this.prisma = new PrismaClient({ adapter });
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    // Buscar usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email: request.email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(request.password, user.password || '');

    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );

    return {
      id: user.id,
      email: user.email || '',
      name: user.name || '',
      token,
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.jwtSecret);
      return true;
    } catch {
      return false;
    }
  }
}
