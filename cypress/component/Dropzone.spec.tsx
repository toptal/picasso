import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { Dropzone, DropzoneProps } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { mount } from '@cypress/react'

const renderDropzone = (props: DropzoneProps) => (
  <Container padded='small'>
    <Dropzone style={{ width: 300 }} {...props} />
  </Container>
)

describe('Dropzone', () => {
  it('renders without props', () => {
    mount(<TestingPicasso>{renderDropzone({})}</TestingPicasso>)
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
    cy.get('body').happoScreenshot()
  })

  it('renders with hovered', () => {
    mount(
      <TestingPicasso>
        {renderDropzone({ className: '__hover', hint: 'Max file size: 25MB' })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders with error', () => {
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

  it('renders completed', () => {
    const DropzoneWithState = () => {
      const [value, setValue] = useState<DropzoneProps['value']>([
        {
          uploading: false,
          file: new File(['resume.pdf'], 'resume.pdf')
        }
      ])

      return renderDropzone({
        value,
        onRemove: () => setValue([]),
        'data-testid': 'foobar'
      })
    }

    mount(
      <TestingPicasso>
        <DropzoneWithState />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()

    cy.get('[class*=completed]').should('exist')
    cy.get('button').as('removeButton').realClick()
    cy.get('[class*=completed]').should('not.exist')
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
          onRemove: () => {}
        })}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
