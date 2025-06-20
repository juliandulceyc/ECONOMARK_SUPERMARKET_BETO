describe('Home', () => {
  beforeEach(() => {
    // Intercepta la petición de usuario
    cy.intercept('GET', '/auth/home', {
      user: { username: 'HCD', correo: 'admin@correo.com', rol: 'admin' }
    }).as('getUser');
    // Simula login y guarda el token
    cy.request('POST', '/auth/login', {
      username: 'HCD',
      password: '123456'
    }).then((resp) => {
      window.localStorage.setItem('token', resp.body.token);
      cy.visit('/home');
    });
  });

  it('debe redirigir a login si no hay token', () => {
    window.localStorage.removeItem('token');
    cy.visit('/home');
    cy.url().should('include', '/login');
  });

  it('debe mostrar el menú principal (dashboard) por defecto', () => {
    cy.contains('Usuarios').should('exist');
    cy.contains('Total Ventas').should('exist');
    cy.contains('Ganancias').should('exist');
  });

  it('debe mostrar productos al navegar a Inventario', () => {
    cy.get('.sidebar-wrapper').contains('Inventario').click();
    cy.contains('Productos').should('exist');
  });

  it('debe mostrar usuarios solo si el usuario es admin', () => {
    cy.intercept('GET', '/auth/home', {
      user: { username: 'HCD', correo: 'admin@correo.com', rol: 'admin' }
    });
    window.localStorage.setItem('token', 'TOKEN_ADMIN');
    cy.visit('/home');
    cy.get('.sidebar-wrapper').contains('Usuarios').click();
    cy.contains('Usuarios').should('exist');
  });

  it('no debe mostrar el botón Usuarios si el usuario no es admin', () => {
    cy.intercept('GET', '/auth/home', {
      user: { username: 'Empleado', correo: 'empleado@correo.com', rol: 'empleado' }
    });
    window.localStorage.setItem('token', 'TOKEN_EMPLEADO');
    cy.visit('/home');
    cy.get('.sidebar-wrapper').contains('Usuarios').should('not.exist');
  });


  it('debe mostrar ventas al navegar a Ventas', () => {
    cy.get('.sidebar-wrapper').contains('Ventas').click();
    cy.contains('Cobrar').should('exist');
  });

  it('debe mostrar reportes al navegar a Reportes', () => {
    cy.get('.sidebar-wrapper').contains('Reportes').click();
    cy.contains('Reportes').should('exist');
  });

  it('debe alternar el sidebar', () => {
    cy.get('.sidebar-wrapper button').first().click();
    cy.get('.sidebar').should('have.class', 'collapsed');
  });

  it('debe bloquear el botón atrás hacia login', () => {
    cy.go('back');
    cy.url().should('include', '/home');
  });
});