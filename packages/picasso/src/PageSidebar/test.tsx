import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { fireEvent, waitFor } from '@testing-library/react'

import { Props } from './PageSidebar'
import PageSidebar from './'

const TestSidebar = ({ children }: OmitInternalProps<Props>) => {
  return <PageSidebar>{children}</PageSidebar>
}

const renderCollapsibleSidebar = ({
  defaultCollapsed
}: {
  defaultCollapsed?: boolean
}) => {
  return render(
    <PageSidebar
      collapsible
      defaultCollapsed={defaultCollapsed}
      testIds={{
        hoverWrapper: 'hover-wrapper',
        collapseButton: 'collapse-button',
        container: 'container'
      }}
    >
      <PageSidebar.Menu />
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
      const { getByTestId } = renderCollapsibleSidebar({})

      fireEvent.mouseEnter(getByTestId('hover-wrapper'))
      await waitFor(() => {
        expect(getByTestId('collapse-button')).toBeVisible()
      })
    })
  })

  describe('when collapse button clicked', () => {
    it('shrinks the width of sidebar', async () => {
      const { getByTestId } = renderCollapsibleSidebar({})
      const container = getByTestId('container')

      fireEvent.mouseEnter(getByTestId('hover-wrapper'))
      await waitFor(() => {
        expect(container).toHaveStyle({ width: '14.75rem' })
      })

      fireEvent.click(getByTestId('collapse-button'))
      await waitFor(() => {
        expect(container).toHaveStyle({ width: '5rem' })
      })
    })
  })

  describe('when default collapsed true', () => {
    it('renders sidebar in collapsed state as default', async () => {
      const { getByTestId } = renderCollapsibleSidebar({
        defaultCollapsed: true
      })

      expect(getByTestId('container')).toHaveStyle({ width: '5rem' })
    })
  })
})
