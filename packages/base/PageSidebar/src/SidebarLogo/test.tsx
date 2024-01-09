import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { noop } from '@toptal/picasso-utils'

import Logo from '../Logo'
import type { Props } from './SidebarLogo'
import SidebarLogo from './SidebarLogo'
import { SidebarContextProvider } from '../PageSidebar/SidebarContextProvider'

const TestSidebarLogo = ({ children }: Props) => (
  <SidebarLogo>{children}</SidebarLogo>
)

const renderSidebarLogoWithContext = ({
  isCollapsed,
}: {
  isCollapsed: boolean
}) => {
  return render(
    <SidebarContextProvider
      expandedItemKey={null}
      setExpandedItemKey={noop}
      isCollapsed={isCollapsed}
      isHovered={false}
    >
      <SidebarLogo
        collapsedLogo={<Logo emblem data-testid='collapse-logo' />}
        fullLogo={<Logo data-testid='full-logo' />}
      >
        <Logo variant='black' data-testid='children-logo' />
      </SidebarLogo>
    </SidebarContextProvider>
  )
}

describe('SidebarLogo', () => {
  it('renders', () => {
    const { container } = render(
      <TestSidebarLogo>
        <Logo />
      </TestSidebarLogo>
    )

    expect(container).toMatchSnapshot()
  })

  describe('when sidebar is collapsed', () => {
    it('renders collapsed logo with children', () => {
      const { getByTestId, queryByTestId } = renderSidebarLogoWithContext({
        isCollapsed: true,
      })

      expect(getByTestId('collapse-logo')).toBeVisible()
      expect(queryByTestId('full-logo')).toBeNull()

      expect(getByTestId('children-logo')).toBeVisible()
    })
  })

  describe('when sidebar is not collapsed', () => {
    it('renders full logo with children', () => {
      const { getByTestId, queryByTestId } = renderSidebarLogoWithContext({
        isCollapsed: false,
      })

      expect(queryByTestId('collapse-logo')).toBeNull()
      expect(getByTestId('full-logo')).toBeVisible()

      expect(getByTestId('children-logo')).toBeVisible()
    })
  })
})
