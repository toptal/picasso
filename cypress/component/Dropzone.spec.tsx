import React from 'react'
import type { DropzoneProps } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import { Container, Dropzone } from '@toptal/picasso'

const renderDropzone = (props?: DropzoneProps) => (
  <Container padded={SPACING_4}>
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
})
