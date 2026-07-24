import React from 'react'
import { Tabs } from '@toptal/picasso'

import { loadAvatarFixture } from '../support/fixtures'

const component = 'Tabs'

const getAvatarSrc = loadAvatarFixture()

describe('Tabs', () => {
  describe('with vertical orientation', () => {
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
          <Tabs.Tab
            avatar={getAvatarSrc()}
            description='Description'
            label='Label'
          />
          <Tabs.Tab
            avatar={getAvatarSrc()}
            description='Description'
            label='Label'
          />
          <Tabs.Tab
            avatar={getAvatarSrc()}
            disabled
            description='Description'
            label='Label'
          />
          <Tabs.Tab avatar={getAvatarSrc()} label='Label' />

          <Tabs.Tab avatar={null} description='Description' label='Label' />
          <Tabs.Tab avatar='' description='Description' label='Label' />

          <Tabs.Tab
            avatar={getAvatarSrc()}
            data-testid='to-be-hovered'
            description='Description'
            label='Label'
          />
        </Tabs>
      )

      // let the base64 fixture avatars decode before capturing
      cy.waitForImagesDecoded()

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
