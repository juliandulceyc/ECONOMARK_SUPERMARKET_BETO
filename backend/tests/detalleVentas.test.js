import request from 'supertest';
import app from '../index.js';

describe('POST /detalle_ventas', () => {
  it('debe rechazar si falta idVenta', async () => {
    const res = await request(app)
      .post('/detalle_ventas')
      .send({ idProducto: 1, cantidad: 2, precio: 10.5, descuento: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('idVenta'))).toBe(true);
  });

  it('debe rechazar si el precio no es numérico', async () => {
    const res = await request(app)
      .post('/detalle_ventas')
      .send({ idVenta: 1, idProducto: 1, cantidad: 2, precio: 'abc', descuento: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('precio'))).toBe(true);
  });

  it('debe rechazar si el descuento no es numérico', async () => {
    const res = await request(app)
      .post('/detalle_ventas')
      .send({ idVenta: 1, idProducto: 1, cantidad: 2, precio: 10.5, descuento: 'abc' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('descuento'))).toBe(true);
  });
});