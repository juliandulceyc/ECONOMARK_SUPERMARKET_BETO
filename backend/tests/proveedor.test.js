import request from 'supertest';
import app from '../index.js';

describe('POST /proveedores', () => {
  it('debe rechazar un email inválido', async () => {
    const res = await request(app)
      .post('/proveedores')
      .send({ nombreProveedor: 'Test', email: 'noesemail', telefono: '123' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Email inválido');
  });
});