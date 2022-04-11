import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { fireEvent, waitFor } from '@testing-library/react'

import PageSidebar, { Props } from './Sidebar'
import { Overview16 } from '../Icon'

const TestSidebar = ({ children }: OmitInternalProps<Props>) => {
  return <PageSidebar>{children}</PageSidebar>
}

const renderCollapsibleSidebar = (props: Props) => {
  return render(
    <PageSidebar
      {...props}
      collapsible
      testIds={{
        hoverWrapper: 'hover-wrapper',
        collapseButton: 'collapse-button',
        container: 'container'
      }}
    >
      <PageSidebar.Menu>
        <PageSidebar.Item icon={<Overview16 data-testid='icon' />}>
          <span data-testid='text-content'>Overview</span>
        </PageSidebar.Item>
      </PageSidebar.Menu>
    </PageSidebar>
  )
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

  describe('when sidebar is collapsible and user hovers wrapper', () => {
    it('renders collapse button', async () => {
      const { getByTestId } = renderCollapsibleSidebar({
        defaultCollapsed: true
      })

      fireEvent.mouseEnter(getByTestId('hover-wrapper'))
      await waitFor(() => {
        expect(getByTestId('collapse-button')).toBeVisible()
      })
    })
  })

  describe('when collapse button clicked', () => {
    it('triggers onCollapse callback', async () => {
      const onCollapseChange = jest.fn()

      const { getByTestId } = renderCollapsibleSidebar({
        onCollapseChange
      })

      fireEvent.mouseEnter(getByTestId('hover-wrapper'))
      await waitFor(() => {
        expect(getByTestId('collapse-button')).toBeVisible()
      })

      fireEvent.click(getByTestId('collapse-button'))
      await waitFor(() => {
        expect(onCollapseChange).toHaveBeenCalledWith(true)
      })
    })
  })
})
