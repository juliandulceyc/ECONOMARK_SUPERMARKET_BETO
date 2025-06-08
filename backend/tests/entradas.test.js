import request from 'supertest';
import app from '../index.js';

describe('POST /entradas', () => {
  it('debe rechazar si falta idProveedor', async () => {
    const res = await request(app)
      .post('/entradas')
      .send({
        idUsuario: 1,
        tipo_comprobante: "FACTURA",
        num_comprobante: "12345",
        fecha: "2024-06-07",
        impuesto: 19,
        total: 100,
        estado: "ACTIVO"
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('idProveedor'))).toBe(true);
  });

  it('debe rechazar si la fecha no es válida', async () => {
    const res = await request(app)
      .post('/entradas')
      .send({
        idProveedor: 1,
        idUsuario: 1,
        tipo_comprobante: "FACTURA",
        num_comprobante: "12345",
        fecha: "no-es-fecha",
        impuesto: 19,
        total: 100,
        estado: "ACTIVO"
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('fecha'))).toBe(true);
  });
});