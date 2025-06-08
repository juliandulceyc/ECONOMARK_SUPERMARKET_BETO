import request from 'supertest';
import app from '../index.js';

describe('POST /ventas', () => {
  it('debe rechazar si falta idCliente', async () => {
    const res = await request(app)
      .post('/ventas')
      .send({
        idUsuario: 1,
        tipo_comprobante: "FACTURA",
        num_comprobante: "12345",
        fecha_hora: "2024-06-07T10:00:00Z",
        impuesto: 19,
        total: 100,
        estado: "ACTIVO"
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('idCliente'))).toBe(true);
  });

  it('debe rechazar si la fecha_hora no es válida', async () => {
    const res = await request(app)
      .post('/ventas')
      .send({
        idCliente: 1,
        idUsuario: 1,
        tipo_comprobante: "FACTURA",
        num_comprobante: "12345",
        fecha_hora: "no-es-fecha",
        impuesto: 19,
        total: 100,
        estado: "ACTIVO"
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.some(e => e.msg.includes('fecha_hora'))).toBe(true);
  });
});