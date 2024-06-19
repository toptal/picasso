import React from 'react'
import { Tabs } from '@toptal/picasso'

const component = 'Tabs'

describe('Tabs', () => {
  describe('with vertical orientation', () => {
    let src: string | null = null

    before(() => {
      // eslint-disable-next-line max-nested-callbacks, promise/catch-or-return
      cy.fixture('pablo.jpg').then(image => {
        src = 'data:image/jpg;base64,' + image

        return image
      })
    })
    it('renders with label', () => {
      cy.mount(
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' disabled />
          <Tabs.Tab label='Label' />
          <Tabs.Tab data-testid='to-be-hovered' label='Label' />
          <Tabs.Tab label='Truncated very long label' />
        </Tabs>
      )

      cy.getByTestId('to-be-hovered').hoverAndTakeHappoScreenshot({
        component,
        variant: 'vertical-with-label/after-hovered',
      })

      cy.contains('Truncated').realHover()
      cy.getByRole('tooltip')
        .should('contain.text', 'Truncated very long label')
        .should('be.visible')
    })

    it('renders with label and description', () => {
      cy.mount(
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab description='Description' label='Label' />
          <Tabs.Tab description='Description' disabled label='Label' />
          <Tabs.Tab description='Description' label='Label' />
          <Tabs.Tab
            data-testid='to-be-hovered'
            description='Description'
            label='Label'
          />
          <Tabs.Tab
            data-testid='truncated'
            description='Truncated very very long description'
            label='Label'
          />
        </Tabs>
      )

      cy.getByTestId('to-be-hovered').hoverAndTakeHappoScreenshot({
        component,
        variant: 'vertical-with-description/after-hovered',
      })

      cy.getByTestId('truncated').contains('Truncated').realHover()
      cy.getByRole('tooltip')
        .should('contain.text', 'Truncated very very long description')
        .should('be.visible')
    })

    it('renders with user badge', () => {
      cy.mount(
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab avatar={src} description='Description' label='Label' />
          <Tabs.Tab avatar={src} description='Description' label='Label' />
          <Tabs.Tab
            avatar={src}
            disabled
            description='Description'
            label='Label'
          />
          <Tabs.Tab avatar={src} label='Label' />

          <Tabs.Tab avatar={null} description='Description' label='Label' />
          <Tabs.Tab avatar='' description='Description' label='Label' />

          <Tabs.Tab
            avatar={src}
            data-testid='to-be-hovered'
            description='Description'
            label='Label'
          />
        </Tabs>
      )

      cy.getByTestId('to-be-hovered').hoverAndTakeHappoScreenshot({
        component,
        variant: 'vertical-with-user-badge/after-hovered',
      })
    })
    describe('does not render avatar', () => {
      // eslint-disable-next-line max-nested-callbacks
      it('when avatar is undefined', () => {
        cy.mount(
          <Tabs value={0} orientation='vertical'>
            <Tabs.Tab
              avatar={undefined}
              description='Description'
              label='Label'
            />
          </Tabs>
        )

        cy.get('img').should('not.exist')
      })
    })
  })
})
