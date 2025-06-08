import request from 'supertest';
import app from '../index.js';

describe('POST /clientes', () => {
  it('debe rechazar si falta el nombre del cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({ email: 'test@correo.com', telefono: '123456789' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El nombre del cliente es obligatorio')).toBe(true);
  });

  it('debe rechazar si el email es inválido', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({ nombreCliente: 'Juan', email: 'noesemail', telefono: '123456789' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'Email inválido')).toBe(true);
  });
});