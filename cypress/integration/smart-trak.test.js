//
// **** SMART Trak App Tests ****
// https://on.cypress.io/introduction-to-cycy.snapshot()
// **************** Testing will fail on a the chrom browser. See video - the user stories pass. Auth interferes with
describe('SMART Trak App e2e testing', function () {
  it('.should() - assert that <title> is correct', function () {
    cy.visit('http://localhost:3000/');
    cy.title().should('include', 'Smart Trak')
  })
  it('cy.get() - find a "CREATE AN ACCOUNT BUTTON", click it, and create an accout then be redirected to a new page.', function () {
    // Get DOM elements by class
    cy.get('.call-to-action > a').click();
    cy.get('input#email')
      .type('testAccount@test.com')
    cy.get('input#firstName')
      .type('Kyle')
    cy.get('input#lastName')
      .type('Coberly')
    cy.get('input#password')
      .type('12345Aa!')
    cy.get('#submit').click()
  })
  it('cy.get() + cy.should() on a successfull account creation, find the nav bar has changed and Adding a goal is possible', function() {
    cy.get('.auth-nav').should('contain', 'Logout')
    cy.get('.add-box').should('contain', 'Add A Goal').click()
    cy.screenshot()
  });
})
