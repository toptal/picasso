import React from 'react'
import { Container, Dropzone, DropzoneProps } from '@toptal/picasso'

const renderDropzone = (props?: DropzoneProps) => (
  <Container padded='small'>
    <Dropzone style={{ width: '300px' }} {...props} />
  </Container>
)

const component = 'Dropzone'

describe('Dropzone', () => {
  it('renders without props', () => {
    cy.mount(renderDropzone())
    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  it('renders with hint', () => {
    cy.mount(
      renderDropzone({
        hint: 'Max file size: 25MB',
      })
    )
    cy.contains('Max file size').should('be.visible')

    cy.get('body').happoScreenshot({
      component,
      variant: 'with-hint',
    })
  })

  it('renders with error', () => {
    cy.mount(
      renderDropzone({
        errorMessages: ['File size exceeds the 25MB limit.'],
        hint: 'Max file size: 25MB',
      })
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'error',
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
      variant: 'uploading',
    })
  })

  it('renders hovered', () => {
    cy.mount(renderDropzone({ hovered: true }))
    cy.get('body').happoScreenshot({
      component,
      variant: 'hovered-state',
    })
  })

  it('renders focused', () => {
    cy.mount(renderDropzone({ focused: true }))

    cy.get('body').happoScreenshot({
      component,
      variant: 'focused-state',
    })
  })

  it('renders with progress bar', () => {
    cy.mount(
      renderDropzone({
        value: [
          {
            uploading: true,
            progress: 50,
            file: new File(['resume.pdf'], 'resume.pdf'),
          },
        ],
      })
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'uploading/with-progress-bar',
    })
  })

  it('renders disabled', () => {
    cy.mount(
      renderDropzone({
        value: [
          {
            uploading: false,
            progress: 100,
            file: new File(['resume.pdf'], 'resume.pdf'),
          },
        ],
        disabled: true,
        onRemove: () => {},
      })
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'disabled',
    })
  })

  it('renders completed with multiple files', () => {
    cy.mount(
      renderDropzone({
        value: [
          {
            uploading: false,
            progress: 0,
            file: new File(['resume.pdf'], 'resume.pdf'),
          },
          {
            uploading: false,
            progress: 0,
            file: new File(['portfolio.pdf'], 'portfolio.pdf'),
          },
        ],
        disabled: true,
        onRemove: () => {},
      })
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'completed/with-multiple-files',
    })
  })
})
