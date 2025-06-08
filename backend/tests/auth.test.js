import request from 'supertest';
import app from '../index.js';

describe('Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    it('debe rechazar un correo inválido', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          rol: 'admin',
          username: 'testuser',
          correo: 'correo-invalido',
          password: '123456'
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Correo inválido');
    });
  });

  describe('POST /auth/login', () => {
    it('debe rechazar si falta el usuario', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ password: '123456' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors.some(e => e.msg === 'Nombre de usuario/correo requerido')).toBe(true);
    });
    it('debe rechazar si falta la contraseña', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors.some(e => e.msg === 'Contraseña requerida')).toBe(true);
    });
  });

  describe('POST /auth/forgot-password', () => {
    it('debe rechazar un correo inválido', async () => {
      const res = await request(app)
        .post('/auth/forgot-password')
        .send({ correo: 'correo-invalido' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].msg).toBe('Correo válido requerido');
    });
  });

  describe('POST /auth/reset-password', () => {
    it('debe rechazar si falta el token', async () => {
      const res = await request(app)
        .post('/auth/reset-password')
        .send({ newPassword: '123456' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors.some(e => e.msg === 'Token requerido')).toBe(true);
    });
    it('debe rechazar si la contraseña es muy corta', async () => {
      const res = await request(app)
        .post('/auth/reset-password')
        .send({ token: 'alguntoken', newPassword: '123' });
      expect(res.statusCode).toBe(400);
      expect(res.body.errors.some(e => e.msg === 'La nueva contraseña debe tener al menos 6 caracteres')).toBe(true);
    });
  });
});