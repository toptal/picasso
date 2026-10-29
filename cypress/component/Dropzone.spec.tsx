import React from 'react'
import type { DropzoneProps } from '@toptal/picasso'
import { Container, Dropzone } from '@toptal/picasso'

import { FOCUS_RING, toHaveStyle, toMatchFocusVisible } from '../support/focus'

const renderDropzone = (props?: DropzoneProps) => (
  <Container padded='small'>
    <Dropzone style={{ width: '300px' }} {...props} />
  </Container>
)

const component = 'Dropzone'

describe('Dropzone', () => {
  it('renders hovered', () => {
    cy.mount(renderDropzone({ hovered: true }))

    cy.get('body').happoScreenshot({
      component,
      variant: 'hovered-state',
    })
  })

  it('renders with uploading files', () => {
    cy.mount(
      renderDropzone({
        value: [
          { uploading: true, file: new File(['resume.pdf'], 'resume.pdf') },
        ],
      })
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'with-uploading-files',
    })
  })

  describe('when focused', () => {
    it('shows focus ring on keyboard focus', () => {
      cy.mount(
        <>
          <button>Before</button>
          {renderDropzone({ 'data-testid': 'dropzone' })}
        </>
      )

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.getByTestId('dropzone')
        .should('have.focus')
        .and(toMatchFocusVisible(true))
        .and(toHaveStyle('boxShadow', FOCUS_RING))
    })
  })
})
