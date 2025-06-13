describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://172.210.65.94:3000/auth/home', {
      user: { username: 'HCD', correo: 'admin@correo.com', rol: 'admin' }
    }).as('getUser');
    cy.request('POST', 'http://172.210.65.94:3000/auth/login', {
      username: 'HCD',
      password: '123456'
    }).then((resp) => {
      window.localStorage.setItem('token', resp.body.token);
      cy.visit('http://172.210.65.94:5173/home');
    });
  });

  it('debe redirigir a login si no hay token', () => {
    window.localStorage.removeItem('token');
    cy.visit('http://172.210.65.94:5173/home');
    cy.url().should('include', '/login');
  });

  it('debe mostrar el menú principal (dashboard) por defecto', () => {
    cy.contains('Usuarios').should('exist');
    cy.contains('Total Ventas').should('exist');
    cy.contains('Ganancias').should('exist');
  });

  it('debe mostrar productos al navegar a Inventario', () => {
    cy.contains('.nav-item[role="button"]', 'Inventario', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Productos', { timeout: 10000 }).should('exist');
  });

  it('debe mostrar usuarios solo si el usuario es admin', () => {
    window.localStorage.setItem('token', 'TOKEN_ADMIN');
    cy.visit('http://172.210.65.94:5173/home');
    cy.get('.sidebar-wrapper').contains('Usuarios').click();
    cy.contains('Usuarios').should('exist'); // CompShowUsers muestra este título
  });

  it('debe mostrar mensaje de permisos si usuario no es admin en usuarios', () => {
    window.localStorage.setItem('token', 'TOKEN_EMPLEADO');
    cy.visit('http://172.210.65.94:5173/home');
    cy.get('.sidebar-wrapper').contains('Usuarios').click();
    cy.contains('No tienes permisos para acceder a esta sección.').should('exist');
  });

  it('debe mostrar ventas al navegar a Ventas', () => {
    cy.get('.sidebar-wrapper').contains('Ventas').click();
    cy.contains('Cobrar').should('exist'); // Ventas muestra botón "Cobrar"
  });

  it('debe mostrar reportes al navegar a Reportes', () => {
    cy.get('.sidebar-wrapper').contains('Reportes').click();
    cy.contains('Reportes').should('exist'); // Reports muestra este título
  });

  it('debe alternar el sidebar', () => {
    cy.get('.sidebar-wrapper button').contains('☰').click(); // El botón de colapsar suele ser el ícono ☰
    cy.get('.sidebar-wrapper').should('have.class', 'collapsed'); // Si tu sidebar usa esta clase al colapsar
  });

  it('debe bloquear el botón atrás hacia login', () => {
    cy.go('back');
    cy.url().should('include', '/home');
  });
});