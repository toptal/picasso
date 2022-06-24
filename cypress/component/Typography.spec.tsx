import React from 'react'
import { Typography } from '@toptal/picasso'

const component = 'Typography'

describe('Typography', () => {
  it('renders body', () => {
    cy.mount(
      <>
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
      </>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'body/all-sizes',
    })
  })

  it('renders headings', () => {
    cy.mount(
      (['small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <Typography key={size} variant='heading' size={size}>
          Heading ({size})
        </Typography>
      ))
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'heading/all-sizes',
    })
  })

  it('renders with a line through', () => {
    cy.mount(<Typography lineThrough>Text</Typography>)
    cy.get('body').happoScreenshot({
      component,
      variant: 'line-through',
    })
  })

  it('renders underlined', () => {
    cy.mount(
      <>
        <Typography underline='solid'>Text</Typography>
        <Typography underline='dashed'>Text</Typography>
      </>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'underlined',
    })
  })

  it('renders colored', () => {
    cy.mount(
      <>
        {(
          [
            'green',
            'red',
            'yellow',
            'light-grey',
            'grey',
            'dark-grey',
            'black',
          ] as const
        ).map(color => (
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
      </>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'all-colors',
    })
  })
})
