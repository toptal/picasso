import React from 'react'
import { Container } from '@toptal/picasso'
import { Paper } from '@toptal/picasso-paper'

const component = 'Paper'

describe('Paper', () => {
  it('renders component with default elevation', () => {
    cy.mount(
      <Container padded='small' gap='small'>
        <Paper>Test text</Paper>
        <div className='bg-blue-100 text-xl font-medium text-black'>
          Test regular div
        </div>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'paper/default',
    })
  })

  it('renders component with custom elevation', () => {
    cy.mount(
      <Container padded='small' gap='small'>
        <Paper elevation={15}>Test text</Paper>
        <div className='bg-blue-100 text-xl font-medium text-black'>
          Test regular div
        </div>
      </Container>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'paper/custom-elevation',
    })
  })
})
