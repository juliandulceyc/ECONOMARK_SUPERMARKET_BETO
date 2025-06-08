import request from 'supertest';
import app from '../index.js';

describe('POST /categorias', () => {
  it('debe rechazar si falta el nombre de la categoría', async () => {
    const res = await request(app)
      .post('/categorias')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El nombre de la categoría es obligatorio')).toBe(true);
  });

  it('debe rechazar si el estado no es booleano', async () => {
    const res = await request(app)
      .post('/categorias')
      .send({ nombreCategoria: 'Bebidas', estado: 'activo' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg === 'El estado debe ser booleano')).toBe(true);
  });
});