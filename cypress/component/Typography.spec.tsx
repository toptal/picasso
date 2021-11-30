import React from 'react'
import { Table, Typography } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Typography', () => {
  it('renders body', () => {
    mount(
      <TestingPicasso>
        {(['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const).map(
          size => (
            <Typography key={size} variant='body' size={size}>
              Body ({size})
            </Typography>
          )
        )}
        <div style={{ fontSize: '2rem' }}>
          <Typography variant='body' size='inherit'>
            Body (inherit)
          </Typography>
        </div>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders headings', () => {
    mount(
      <TestingPicasso>
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
          <Typography key={size} variant='heading' size={size}>
            Heading ({size})
          </Typography>
        ))}
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders with a line through', () => {
    mount(
      <TestingPicasso>
        <Typography lineThrough>Text</Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders underlined', () => {
    mount(
      <TestingPicasso>
        <Typography underline='solid'>Text</Typography>
        <Typography underline='dashed'>Text</Typography>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders colored', () => {
    mount(
      <TestingPicasso>
        {([
          'green',
          'red',
          'yellow',
          'light-grey',
          'grey',
          'dark-grey',
          'black'
        ] as const).map(color => (
          <Typography key={color} color={color}>
            Text
          </Typography>
        ))}
        <div style={{ backgroundColor: 'blue' }}>
          <Typography invert>Text</Typography>
        </div>
        <div style={{ color: 'darkcyan' }}>
          <Typography color='inherit'>Text</Typography>
        </div>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  describe('Typography line-height', () => {
    it('renders Typography inside Table', () => {
      const testIds = {
        typography: 'typography'
      }

      mount(
        <TestingPicasso>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Typography data-testid={testIds.typography}>Text</Typography>
                </Table.Cell>
                <Table.Cell>Text</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()

      cy.get(`[data-testid="${testIds.typography}"]`).should(
        'have.css',
        'line-height',
        '20px'
      )
    })
  })
})
