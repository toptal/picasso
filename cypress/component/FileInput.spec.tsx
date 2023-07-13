import React from 'react'
import type { FileInputProps } from '@toptal/picasso'
import { FileInput } from '@toptal/picasso'

const TestFileInput = (props: FileInputProps = {}) => (
  <FileInput hint='No file uploaded.' {...props} />
)

const component = 'FileInput'

describe('FileInput', () => {
  it('opens file dialog', () => {
    cy.mount(<TestFileInput />)
    const openFileDialog = cy.stub().as('openFileDialog')

    cy.get('input[type="file"]')
      .first()
      .should($input => {
        $input.on('click', openFileDialog)
      })

    cy.get('button').first().click()
    cy.get('button')
      .first()
      .should(() => expect(openFileDialog).to.be.called)

    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-clicked',
    })
  })
})
