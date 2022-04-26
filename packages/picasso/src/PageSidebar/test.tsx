import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, act } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import PageSidebar, { Props } from './PageSidebar'
import {
  SidebarContextProvider,
  useSidebarContext
} from './SidebarContextProvider'

const TestSidebar = ({ children }: OmitInternalProps<Props>) => {
  return <PageSidebar>{children}</PageSidebar>
}

describe('PageSidebar', () => {
  it('renders', () => {
    const { container } = render(<TestSidebar />)

    expect(container).toMatchSnapshot()
  })

  it('with menu', () => {
    const { container } = render(
      <TestSidebar>
        <PageSidebar.Menu />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  it('with one normal and one bottom menu', () => {
    const { container } = render(
      <TestSidebar>
        <PageSidebar.Menu />
        <PageSidebar.Menu bottom />
      </TestSidebar>
    )

    expect(container).toMatchSnapshot()
  })

  describe('when you set a expandedItemKey', () => {
    it('reflects on its state', async () => {
      const NEW_EXPANDED_KEY = 42

      const Example = () => {
        const { setExpandedItemKey, expandedItemKey } = useSidebarContext()

        return (
          <div>
            <button onClick={() => setExpandedItemKey(NEW_EXPANDED_KEY)}>
              Change it
            </button>
            <span role='log'>{expandedItemKey}</span>
          </div>
        )
      }

      const { getByRole } = render(
        <SidebarContextProvider isHovered={false} isCollapsed={false}>
          <Example />
        </SidebarContextProvider>
      )

      const button = getByRole('button')
      const text = getByRole('log')

      expect(text).not.toHaveTextContent(NEW_EXPANDED_KEY.toString())

      act(() => {
        fireEvent.click(button)
      })

      expect(text).toHaveTextContent(NEW_EXPANDED_KEY.toString())
    })
  })
})
