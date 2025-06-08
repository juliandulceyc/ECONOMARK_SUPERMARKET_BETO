import request from 'supertest';
import app from '../index.js';

describe('POST /credenciales', () => {
  it('debe rechazar si falta el rol', async () => {
    const res = await request(app)
      .post('/credenciales')
      .send({ username: 'usuario', correo: 'test@correo.com', password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El rol es obligatorio')).toBe(true);
  });

  it('debe rechazar si el correo es inválido', async () => {
    const res = await request(app)
      .post('/credenciales')
      .send({ rol: 'admin', username: 'usuario', correo: 'noesemail', password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'Correo inválido')).toBe(true);
  });
});