describe('Login', () => {
  it('debe mostrar error con credenciales inválidas', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.get('input[name="username"]').type('usuario_invalido');
    cy.get('input[name="password"]').type('clave_invalida');
    cy.get('form').submit();
    cy.contains('El usuario no existe.').should('exist');
  });

  it('debe permitir login con credenciales válidas', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.get('input[name="username"]').type('HCD');
    cy.get('input[name="password"]').type('123456');
    cy.get('form').submit();
    cy.url().should('include', '/home');
  });

  it('debe mostrar error si los campos están vacíos', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.get('form').submit();
    cy.contains('Usuario').should('exist'); // Ajusta el mensaje según tu validación real
  });

  it('debe alternar la visibilidad de la contraseña', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.get('input[name="password"]').type('123456');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('debe redirigir a recuperar contraseña', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.contains('¿Olvidaste tu contraseña?').click();
    cy.url().should('include', '/recuperarContrase');
  });

  it('debe redirigir a registro', () => {
    cy.visit('http://172.210.65.94:5173/login');
    cy.contains('Regístrate').click();
    cy.url().should('include', '/register');
  });
});