describe('Form', () => {
  it('submits the form with success result', () => {
    cy.visit('iframe.html?id=form--backend-communication')

    cy.get('#successName').type('name')
    cy.get('#successSurname').type('surname')

    cy.get('[data-testid=success-submit-button]').click()

    cy.get('[role=alert]')
      .should('be.visible')
      .and('contain', 'Login successful!')
  })

  it('submits the form with the inline error', () => {
    cy.visit('iframe.html?id=form--backend-communication')

    cy.get('#inlineErrorName').type('name')
    cy.get('#inlineErrorSurname').type('surname')

    cy.get('[data-testid=submit-with-inline-error-button]').click()

    cy.contains('Unknown first name').should('be.visible')
    cy.get('[role=alert]')
      .should('be.visible')
      .and(
        'contain',
        'Login failed! Please try another combination of first and last names.'
      )
  })

  it('submits the form and return a string from onSubmit, which should be shown as a notification', () => {
    cy.visit('iframe.html?id=form--backend-communication')

    cy.get('#customNotificationErrorName').type('name')
    cy.get('#customNotificationErrorSurname').type('surname')

    cy.get('[data-testid=submit-with-custom-notification-button]').click()

    cy.get('[role=alert]')
      .should('be.visible')
      .and('contain', 'Custom Notification Message!')
  })
})
