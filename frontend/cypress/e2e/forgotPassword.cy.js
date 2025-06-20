describe('Recuperar Contraseña', () => {
  beforeEach(() => {
    cy.visit('/recuperarContraseña');
  });

  it('debe mostrar error si el correo no existe', () => {
    cy.intercept('POST', '/auth/forgot-password', {
      statusCode: 404,
      body: {},
    }).as('forgotPassword404');

    cy.get('input[name="email"]').type('noexiste@correo.com');
    cy.get('form').submit();
    cy.wait('@forgotPassword404');
    cy.contains('No se encontró un usuario con ese correo.').should('exist');
  });

  it('debe mostrar mensaje de éxito si el correo es válido', () => {
    cy.intercept('POST', '/auth/forgot-password', {
      statusCode: 200,
      body: {},
    }).as('forgotPassword200');

    cy.get('input[name="email"]').type('julian7456@hotmail.com');
    cy.get('form').submit();
    cy.wait('@forgotPassword200');
    cy.contains('Se ha enviado un correo con instrucciones para restablecer tu contraseña.').should('exist');
  });

  it('debe mostrar error genérico si ocurre un error inesperado', () => {
    cy.intercept('POST', '/auth/forgot-password', {
      statusCode: 500,
      body: {},
    }).as('forgotPassword500');

    cy.get('input[name="email"]').type('error@correo.com');
    cy.get('form').submit();
    cy.wait('@forgotPassword500');
    cy.contains('Ocurrió un error. Intenta de nuevo más tarde.').should('exist');
  });

  it('debe redirigir al login al hacer clic en "Volver al inicio de sesión"', () => {
    cy.contains('Volver al inicio de sesión').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});