import React from 'react'
import { Container } from '@toptal/picasso'
import { Dropzone, DropzoneProps } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { mount } from '@cypress/react'

const renderDropzone = (props?: DropzoneProps) => (
  <Container padded='small'>
    <Dropzone style={{ width: '300px' }} {...props} />
  </Container>
)

describe('Dropzone', () => {
  it('renders without props', () => {
    mount(<TestingPicasso>{renderDropzone()}</TestingPicasso>)
    cy.get('body').happoScreenshot()
  })

  it('renders with hint', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          hint: 'Max file size: 25MB'
        })}
      </TestingPicasso>
    )
    cy.contains('Max file size').should('be.visible')
    // TODO: https://toptal-core.atlassian.net/browse/FX-2276
    // cy.get('body').happoScreenshot()
  })

  // TODO: https://toptal-core.atlassian.net/browse/FX-2276
  it.skip('renders with error', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          errorMessages: ['File size exceeds the 25MB limit.'],
          hint: 'Max file size: 25MB'
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders with uploading files', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          value: [
            { uploading: true, file: new File(['resume.pdf'], 'resume.pdf') }
          ]
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders hovered', () => {
    mount(<TestingPicasso>{renderDropzone({ hovered: true })}</TestingPicasso>)
    cy.get('body').happoScreenshot()
  })

  it('renders focused', () => {
    mount(<TestingPicasso>{renderDropzone({ focused: true })}</TestingPicasso>)

    cy.get('body').happoScreenshot()
  })

  it('renders with progress bar', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          value: [
            {
              uploading: true,
              progress: 50,
              file: new File(['resume.pdf'], 'resume.pdf')
            }
          ]
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders disabled', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          value: [
            {
              uploading: false,
              progress: 100,
              file: new File(['resume.pdf'], 'resume.pdf')
            }
          ],
          disabled: true,
          onRemove: () => {}
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders completed with multiple files', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({
          value: [
            {
              uploading: false,
              progress: 0,
              file: new File(['resume.pdf'], 'resume.pdf')
            },
            {
              uploading: false,
              progress: 0,
              file: new File(['portfolio.pdf'], 'portfolio.pdf')
            }
          ],
          disabled: true,
          onRemove: () => {}
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
