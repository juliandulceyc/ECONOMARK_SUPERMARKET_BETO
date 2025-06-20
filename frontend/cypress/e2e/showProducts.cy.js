describe('Gestión de Productos', () => {
  beforeEach(() => {
    // Simula usuario autenticado
    cy.intercept('GET', '/auth/home', {
      user: { username: 'HCD', correo: 'admin@correo.com', rol: 'admin' }
    }).as('getUser');

    window.localStorage.setItem('token', 'TOKEN_VALIDO');

    // Mock de productos (ruta corregida)
    cy.intercept('GET', /\/productos\/.*/, [
      { idProducto: 1, idCategoria: 1, nombreProducto: 'Manzana', precioVenta: 5, stock: 10, estado: 'disponible' },
      { idProducto: 2, idCategoria: 2, nombreProducto: 'Leche', precioVenta: 15, stock: 20, estado: 'disponible' }
    ]).as('getProductos');

    cy.visit('/home');
    cy.contains('Inventario').click();
    cy.wait('@getProductos');
  });

  it('debe mostrar la tabla de productos', () => {
    cy.contains('Manzana').should('exist');
    cy.contains('Leche').should('exist');
  });

  it('debe filtrar productos por búsqueda', () => {
    cy.get('input[placeholder="Buscar..."]').type('Manzana');
    cy.contains('Manzana').should('exist');
    cy.contains('Leche').should('not.exist');
  });

  it('debe abrir el modal para crear producto', () => {
    cy.contains('Añadir Producto').click();
    cy.get('.modal-content').should('exist');
    cy.get('.modal-content').contains('Crear Producto');
  });

  it('debe abrir el modal para editar producto', () => {
    cy.get('tbody tr').first().find('.btn-info').click();
    cy.get('.modal-content').should('exist');
    cy.get('.modal-content').contains('Editar Producto');
  });

  it('debe eliminar un producto', () => {
    cy.intercept('DELETE', '/productos/1', {}).as('deleteProducto');
    cy.get('tbody tr').first().find('.btn-danger').click();
    cy.contains('Sí, eliminarlo').click();
    cy.wait('@deleteProducto');
    cy.contains('El producto ha sido eliminado.').should('exist');
  });
});