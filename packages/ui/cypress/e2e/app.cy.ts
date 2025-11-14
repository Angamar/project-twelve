describe('Template App', () => {
  it('displays the welcome message', () => {
    cy.visit('/');
    cy.contains('TypeScript Fullstack Template');
    cy.contains('count is 0');
  });

  it('increments counter when button is clicked', () => {
    cy.visit('/');
    cy.contains('count is 0').click();
    cy.contains('count is 1');
  });

  it('loads users from API', () => {
    cy.visit('/');
    cy.contains('Users from API');
    cy.contains('John Doe');
  });
});