import React from 'react'
import { mount } from '@cypress/react'
import { FileInput, FileInputProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestFileInput = (props: FileInputProps = {}) => (
  <TestingPicasso>
    <FileInput hint='No file uploaded.' {...props} />
  </TestingPicasso>
)

describe('FileInput', () => {
  it('opens file dialog', () => {
    mount(<TestFileInput />)
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
    mount(<TestFileInput buttonLabel='Upload File' />)

    cy.get('body').happoScreenshot()
  })
})
