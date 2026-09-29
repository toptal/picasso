import React from 'react'
import { Tabs } from '@toptal/picasso'

import { loadAvatarFixture } from '../support/fixtures'
import { toHaveStyle, toMatchFocusVisible } from '../support/focus'

const component = 'Tabs'

const getAvatarSrc = loadAvatarFixture()

// blue-500 at 48%, serialized as rgba() or oklab()
const FOCUS_RING = / 0\.48\) 0px 0px 0px 3px inset/
const FOCUS_BAR = / 0px -2px 0px 0px inset/
// gray-100
const FOCUS_BACKGROUND = /^rgb\(243, 244, 246\)$/
// `shadow-1`
const SELECTED_SHADOW = /0\.08\) 0px 0px 8px 0px$/

// horizontal tabs draw focus on `::after` so it isn't clipped
const toShowFocus =
  (orientation: 'horizontal' | 'vertical', expected = true) =>
  ($el: JQuery<HTMLElement>) => {
    if (orientation === 'vertical') {
      toHaveStyle('boxShadow', FOCUS_RING, { expected })($el)

      return
    }

    toHaveStyle('backgroundColor', FOCUS_BACKGROUND, {
      expected,
      pseudo: '::after',
    })($el)
    toHaveStyle('boxShadow', FOCUS_BAR, { expected, pseudo: '::after' })($el)
  }

const renderTabs = (
  orientation: 'horizontal' | 'vertical',
  disabledTabs: string[] = []
) =>
  cy.mount(
    <>
      <button>Before</button>
      <Tabs value={0} orientation={orientation}>
        {['First', 'Second', 'Third', 'Fourth'].map(label => (
          <Tabs.Tab
            key={label}
            label={label}
            disabled={disabledTabs.includes(label)}
          />
        ))}
      </Tabs>
    </>
  )

const testKeyboardFocus = ({
  orientation,
  nextKey,
  previousKey,
}: {
  orientation: 'horizontal' | 'vertical'
  nextKey: 'ArrowRight' | 'ArrowDown'
  previousKey: 'ArrowLeft' | 'ArrowUp'
}) => {
  it(`shows focus style on keyboard focus in ${orientation} orientation`, () => {
    renderTabs(orientation)

    cy.contains('Before').realClick()
    cy.realPress('Tab')
    cy.realPress(nextKey)

    cy.contains('[role=tab]', 'Second')
      .should('have.focus')
      .and('have.attr', 'aria-selected', 'false')
      .and(toMatchFocusVisible(true))
      .and(toShowFocus(orientation))
  })

  it(`does not show focus style on mouse focus in ${orientation} orientation`, () => {
    renderTabs(orientation)

    cy.contains('[role=tab]', 'Second').realClick()

    cy.contains('[role=tab]', 'Second')
      .should('have.focus')
      .and(toMatchFocusVisible(false))
    cy.waitForTransitionsToSettle('[role=tab]')
    cy.contains('[role=tab]', 'Second').should(toShowFocus(orientation, false))
  })

  it(`skips disabled tabs with arrow keys in ${orientation} orientation`, () => {
    renderTabs(orientation, ['Second', 'Fourth'])

    cy.contains('Before').realClick()
    cy.realPress('Tab')
    cy.realPress(nextKey)
    cy.contains('[role=tab]', 'Third').should('have.focus')
    cy.realPress(nextKey)
    cy.contains('[role=tab]', 'First').should('have.focus')
    cy.realPress(previousKey)
    cy.contains('[role=tab]', 'Third').should('have.focus')
    cy.realPress('Home')
    cy.contains('[role=tab]', 'First').should('have.focus')
    cy.realPress('End')
    cy.contains('[role=tab]', 'Third').should('have.focus')
  })
}

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

  describe('when tab is focused', () => {
    testKeyboardFocus({
      orientation: 'horizontal',
      nextKey: 'ArrowRight',
      previousKey: 'ArrowLeft',
    })
    testKeyboardFocus({
      orientation: 'vertical',
      nextKey: 'ArrowDown',
      previousKey: 'ArrowUp',
    })

    it('keeps selected tab elevation in vertical orientation', () => {
      renderTabs('vertical')

      cy.contains('Before').realClick()
      cy.realPress('Tab')

      cy.contains('[role=tab]', 'First')
        .should('have.focus')
        .and(toShowFocus('vertical'))
        .and(toHaveStyle('boxShadow', SELECTED_SHADOW))
    })
  })
})
