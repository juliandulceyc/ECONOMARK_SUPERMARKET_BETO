import request from 'supertest';
import app from '../index.js';

describe('POST /productos', () => {
  it('debe rechazar si falta el nombreProducto', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ idCategoria: 1, precioVenta: 100, stock: 10, estado: 'ACTIVO' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El nombreProducto es obligatorio')).toBe(true);
  });

  it('debe rechazar si el precioVenta no es numérico', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombreProducto: 'Producto', idCategoria: 1, precioVenta: 'abc', stock: 10, estado: 'ACTIVO' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El precioVenta debe ser un número')).toBe(true);
  });

  it('debe rechazar si el estado está vacío', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombreProducto: 'Producto', idCategoria: 1, precioVenta: 100, stock: 10 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El estado es obligatorio')).toBe(true);
  });
});