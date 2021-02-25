import React from 'react'
import { mount } from '@cypress/react'
import { Button, Grid, Tooltip, Typography } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const BehaviourTooltipExample = () => (
  <TestingPicasso>
    <Tooltip content={<Typography data-testid='content'>Content</Typography>}>
      <Button data-testid='trigger'>Trigger</Button>
    </Tooltip>
  </TestingPicasso>
)

const ScreenshotTooltipExample = () => (
  <TestingPicasso>
    <Grid spacing={80}>
      <Grid.Item>
        <Tooltip content='Content' open>
          <Button>Default</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open compact>
          <Button>Compact</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open arrow={false}>
          <Button>Without arrow</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open variant='light'>
          <Button>Light variant</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open variant='dark'>
          <Button>Dark variant</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open placement='top'>
          <Button>Top placement</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open placement='bottom'>
          <Button>Bottom placement</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open placement='left'>
          <Button>Left placement</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content='Content' open placement='right'>
          <Button>Right placement</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content={'Content '.repeat(10)} open>
          <Button>Large content</Button>
        </Tooltip>
      </Grid.Item>
      <Grid.Item>
        <Tooltip content={'Content '.repeat(10)} open maxWidth='none'>
          <Button>Large content without max width</Button>
        </Tooltip>
      </Grid.Item>
    </Grid>
  </TestingPicasso>
)

describe('Tooltip', () => {
  it('renders correctly', () => {
    mount(<ScreenshotTooltipExample />)
    cy.get('body').should('be.visible')
  })

  it('opens and closes by mouse navigation', () => {
    mount(<BehaviourTooltipExample />)
    cy.get('[data-testid=trigger]').trigger('mouseover')
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').trigger('mouseout')
    cy.get('[data-testid=content]').should('not.be.visible')
  })

  it('opens and closes by keyboard navigation', () => {
    mount(<BehaviourTooltipExample />)
    cy.get('[data-testid=trigger]').focus()
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').blur()
    cy.get('[data-testid=content]').should('not.be.visible')
  })
})
