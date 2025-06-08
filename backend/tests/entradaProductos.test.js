import request from 'supertest';
import app from '../index.js';

describe('POST /entrada_productos', () => {
  it('debe rechazar si falta idEntrada', async () => {
    const res = await request(app)
      .post('/entrada_productos')
      .send({ idProducto: 1, cantidad: 5 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('idEntrada'))).toBe(true);
  });

  it('debe rechazar si cantidad es negativa', async () => {
    const res = await request(app)
      .post('/entrada_productos')
      .send({ idEntrada: 1, idProducto: 1, cantidad: -2 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('cantidad'))).toBe(true);
  });
});