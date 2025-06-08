import request from 'supertest';
import app from '../index.js';

describe('POST /detalle_entradas', () => {
  it('debe rechazar si falta idEntrada', async () => {
    const res = await request(app)
      .post('/detalle_entradas')
      .send({ idProducto: 1, cantidad: 5, precio: 10 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('idEntrada'))).toBe(true);
  });

  it('debe rechazar si el precio no es numérico', async () => {
    const res = await request(app)
      .post('/detalle_entradas')
      .send({ idEntrada: 1, idProducto: 1, cantidad: 2, precio: 'abc' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('precio'))).toBe(true);
  });
});