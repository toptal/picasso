import React from 'react'
import { FileInput, FileInputProps } from '@toptal/picasso'

const TestFileInput = (props: FileInputProps = {}) => (
  <FileInput hint='No file uploaded.' {...props} />
)

describe('FileInput', () => {
  it('opens file dialog', () => {
    cy.mount(<TestFileInput />)
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

    cy.get('body').happoScreenshot()
  })

  it('renders with changed label', () => {
    cy.mount(<TestFileInput buttonLabel='Upload File' />)

    cy.get('body').happoScreenshot()
  })
})
