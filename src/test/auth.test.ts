import { AuthRepository } from '../modules/auth/infrastructure/AuthRepository';
import { LoginRequest } from '../modules/auth/domain/LoginRequest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock do Prisma Client
jest.mock('../../generated/prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
    },
  })),
}));

// Mock do bcrypt
jest.mock('bcrypt');

// Mock do jwt
jest.mock('jsonwebtoken');

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let mockPrismaUser: any;

  beforeEach(() => {
    jest.clearAllMocks();
    authRepository = new AuthRepository();
    mockPrismaUser = (authRepository as any).prisma.user;
  });

  describe('login', () => {
    it('deve fazer login com sucesso quando email e senha estão corretos', async () => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'usuario@example.com',
        password: 'senha123',
      };

      const mockUser = {
        id: '1',
        email: 'usuario@example.com',
        password: await bcrypt.hash('senha123', 10),
        name: 'Usuário Teste',
      };

      const mockToken = 'token-jwt-valido';

      mockPrismaUser.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      // Act
      const result = await authRepository.login(loginRequest);

      // Assert
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { email: loginRequest.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginRequest.password, expect.any(String));
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email },
        expect.any(String),
        { expiresIn: '24h' }
      );
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        token: mockToken,
      });
    });

    it('deve lançar erro quando usuário não é encontrado', async () => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'naoexiste@example.com',
        password: 'senha123',
      };

      mockPrismaUser.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(authRepository.login(loginRequest)).rejects.toThrow('Usuário não encontrado');
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { email: loginRequest.email },
      });
    });

    it('deve lançar erro quando a senha está incorreta', async () => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'usuario@example.com',
        password: 'senhaErrada',
      };

      const mockUser = {
        id: '1',
        email: 'usuario@example.com',
        password: await bcrypt.hash('senha123', 10),
        name: 'Usuário Teste',
      };

      mockPrismaUser.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(authRepository.login(loginRequest)).rejects.toThrow('Senha incorreta');
      expect(bcrypt.compare).toHaveBeenCalledWith(loginRequest.password, expect.any(String));
    });

    it('deve gerar um token JWT válido após login bem-sucedido', async () => {
      // Arrange
      const loginRequest: LoginRequest = {
        email: 'usuario@example.com',
        password: 'senha123',
      };

      const mockUser = {
        id: 'uuid-123',
        email: 'usuario@example.com',
        password: await bcrypt.hash('senha123', 10),
        name: 'Usuário Teste',
      };

      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

      mockPrismaUser.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      // Act
      const result = await authRepository.login(loginRequest);

      // Assert
      expect(result.token).toBe(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 'uuid-123', email: 'usuario@example.com' },
        expect.any(String),
        { expiresIn: '24h' }
      );
    });
  });

  describe('validateToken', () => {
    it('deve validar um token JWT válido', async () => {
      // Arrange
      const validToken = 'token-valido';
      (jwt.verify as jest.Mock).mockReturnValue({ id: '1', email: 'usuario@example.com' });

      // Act
      const result = await authRepository.validateToken(validToken);

      // Assert
      expect(result).toBe(true);
      expect(jwt.verify).toHaveBeenCalledWith(validToken, expect.any(String));
    });

    it('deve retornar false para um token JWT inválido', async () => {
      // Arrange
      const invalidToken = 'token-invalido';
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token inválido');
      });

      // Act
      const result = await authRepository.validateToken(invalidToken);

      // Assert
      expect(result).toBe(false);
      expect(jwt.verify).toHaveBeenCalledWith(invalidToken, expect.any(String));
    });

    it('deve retornar false para um token expirado', async () => {
      // Arrange
      const expiredToken = 'token-expirado';
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token expired');
      });

      // Act
      const result = await authRepository.validateToken(expiredToken);

      // Assert
      expect(result).toBe(false);
    });
  });
});
