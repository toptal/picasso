import React from 'react'
import type { TabsProps } from '@toptal/picasso'
import { Tabs, Tooltip, Exclamation16 } from '@toptal/picasso'

const TestIcon = () => (
  <Tooltip content='Some content...' placement='top'>
    <span>
      <Exclamation16 color='red' />
    </span>
  </Tooltip>
)

const TestTabs = ({ children, ...props }: Partial<TabsProps>) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Tabs value={value} onChange={handleChange} {...props}>
      {children}
    </Tabs>
  )
}

interface RenderTabsArgs {
  width?: number | string
  disabledIndicies?: number[]
  withIconIndicies?: number[]
}

const getTabTestId = (index: number) => `tab-${index}`
const getTabSelector = (index: number) =>
  `[data-testid="${getTabTestId(index)}"]`
const getScrollButtonSelector = (direction: string) =>
  `[data-testid="tab-scroll-button-${direction}"]`

const renderTabs = ({
  width,
  disabledIndicies = [],
  withIconIndicies = [],
}: RenderTabsArgs = {}) => {
  return (
    <div style={{ width }}>
      <TestTabs data-testid='tabs'>
        {Array.from({ length: 5 }).map((_, index) => {
          const testId = getTabTestId(index)
          const icon = withIconIndicies.includes(index) ? (
            <TestIcon />
          ) : undefined

          return (
            <Tabs.Tab
              key={testId}
              data-testid={testId}
              disabled={disabledIndicies.includes(index)}
              label='Label'
              icon={icon}
            />
          )
        })}
      </TestTabs>
    </div>
  )
}

const component = 'Tabs'

describe.skip('Tabs', () => {
  describe('with horizontal orientation', () => {
    it('navigates with scroll buttons', () => {
      cy.mount(renderTabs({ width: '13rem' }))

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-scroll-buttons',
      })

      cy.get(getScrollButtonSelector('right')).click()
      cy.get(getTabSelector(0)).should('not.be.visible')
      cy.get(getTabSelector(4)).should('be.visible')
      cy.get(getScrollButtonSelector('left')).should('be.visible')
      cy.get(getScrollButtonSelector('right')).should('not.exist')

      cy.get(getScrollButtonSelector('left')).click()
      cy.get(getTabSelector(0)).should('be.visible')
      cy.get(getTabSelector(4)).should('not.be.visible')
      cy.get(getScrollButtonSelector('left')).should('not.exist')
      cy.get(getScrollButtonSelector('right')).should('be.visible')
    })
  })
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
