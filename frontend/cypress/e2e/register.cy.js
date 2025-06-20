describe('Registro de usuario', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('debe mostrar error si los campos están vacíos', () => {
    cy.get('form').submit();
    cy.contains('El rol es obligatorio').should('exist');
  });

  it('debe mostrar error si el correo es inválido', () => {
    cy.get('select[name="rol"]').select('admin');
    cy.get('input[name="username"]').type('nuevo_usuario');
    cy.get('input[name="correo"]').type('correo_invalido');
    cy.get('input[name="password"]').type('123456');
    cy.get('form').submit();
    cy.contains(/correo.*válido/i).should('exist');
  });

  it('debe mostrar error si el usuario ya existe', () => {
    cy.get('select[name="rol"]').select('admin');
    cy.get('input[name="username"]').type('HCD');
    cy.get('input[name="correo"]').type('admin@correo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('form').submit();
    cy.contains('El nombre de usuario o correo ya está en uso.').should('exist');
  });

  it('debe alternar la visibilidad de la contraseña', () => {
    cy.get('input[name="password"]').type('123456');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.toggle-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('debe registrar usuario correctamente y redirigir a login', () => {
    cy.get('select[name="rol"]').select('empleado');
    cy.get('input[name="username"]').type('usuario_nuevo_' + Date.now());
    cy.get('input[name="correo"]').type('nuevo' + Date.now() + '@correo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('form').submit();
    cy.url().should('include', '/login');
  });

  it('debe redirigir a login desde el enlace', () => {
    cy.contains('Inicia sesión').click();
    cy.url().should('include', '/login');
  });
});