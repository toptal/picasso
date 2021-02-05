describe('FileInput', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=fileinput--default')
  })

  it('opens file dialog', () => {
    const openFileDialog = cy.stub().as('openFileDialog')

    cy.get('input[type="file"]')
      .first()
      .should($input => {
        $input.on('click', openFileDialog)
      })

    cy.get('button')
      .first()
      .click()
      .should(() => expect(openFileDialog).to.be.called)
  })
})
