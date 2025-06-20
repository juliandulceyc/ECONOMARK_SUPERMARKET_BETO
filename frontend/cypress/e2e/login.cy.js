describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('debe mostrar error con credenciales inválidas', () => {
    cy.get('input[name="username"]').type('usuario_invalido');
    cy.get('input[name="password"]').type('clave_invalida');
    cy.get('form').submit();
    cy.contains('Contraseña incorrecta.').should('exist');
  });

  it('debe permitir login con credenciales válidas', () => {
    cy.get('input[name="username"]').type('HCD');
    cy.get('input[name="password"]').type('123456');
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });

  it('debe mostrar error si los campos están vacíos', () => {
    cy.get('form').submit();
    // Ajusta el mensaje según la validación real de tu frontend
    cy.contains('Usuario').should('exist');
  });

  it('debe alternar la visibilidad de la contraseña', () => {
    cy.get('input[name="password"]').type('123456');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('debe redirigir a recuperar contraseña', () => {
    cy.contains('¿Olvidaste tu contraseña?').click();
    cy.url().should('include', '/recuperarContrase');
  });

  it('debe redirigir a registro', () => {
    cy.contains('Regístrate').click();
    cy.url().should('include', '/register');
  });
});