import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageSidebar'
import PageSidebar from './PageSidebar'

const TestSidebar = ({ children }: OmitInternalProps<Props>) => {
  return <PageSidebar>{children}</PageSidebar>
}

const CollapsibleSidebar = (props: OmitInternalProps<Props>) => (
  <PageSidebar collapsible {...props}>
    <PageSidebar.Logo collapsedLogo='Collapsed logo' fullLogo='Full logo' />
  </PageSidebar>
)

const renderCollapsibleSidebar = (props: OmitInternalProps<Props> = {}) =>
  render(<CollapsibleSidebar {...props} />)

const getCollapseButton = () =>
  screen.getByRole('button', { name: 'collapse sidebar' })

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

  describe('when the sidebar is collapsible', () => {
    it('renders it expanded', () => {
      renderCollapsibleSidebar()

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('Full logo')).toBeInTheDocument()
    })

    it('flips it on each collapse button click and reports the requested state', () => {
      const onCollapse = jest.fn()

      renderCollapsibleSidebar({ onCollapse })

      fireEvent.click(getCollapseButton())

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText('Collapsed logo')).toBeInTheDocument()
      expect(onCollapse).toHaveBeenLastCalledWith(true)

      fireEvent.click(getCollapseButton())

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('Full logo')).toBeInTheDocument()
      expect(onCollapse).toHaveBeenLastCalledWith(false)
      expect(onCollapse).toHaveBeenCalledTimes(2)
    })
  })

  describe('when the sidebar is collapsed by default', () => {
    it('renders it collapsed', () => {
      renderCollapsibleSidebar({ defaultCollapsed: true })

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText('Collapsed logo')).toBeInTheDocument()
    })
  })

  describe('when the collapsed prop is set', () => {
    it('follows the prop over defaultCollapsed', () => {
      const { rerender } = renderCollapsibleSidebar({
        collapsed: true,
        defaultCollapsed: false,
      })

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText('Collapsed logo')).toBeInTheDocument()

      rerender(<CollapsibleSidebar collapsed={false} defaultCollapsed />)

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('Full logo')).toBeInTheDocument()
    })

    it('reports each requested state without changing it', () => {
      const onCollapse = jest.fn()
      const { rerender } = renderCollapsibleSidebar({
        collapsed: false,
        onCollapse,
      })

      fireEvent.click(getCollapseButton())

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('Full logo')).toBeInTheDocument()
      expect(onCollapse).toHaveBeenLastCalledWith(true)

      rerender(<CollapsibleSidebar collapsed onCollapse={onCollapse} />)
      fireEvent.click(getCollapseButton())

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText('Collapsed logo')).toBeInTheDocument()
      expect(onCollapse).toHaveBeenLastCalledWith(false)
      expect(onCollapse).toHaveBeenCalledTimes(2)
    })
  })

  describe('when the collapsed prop is unset after being set', () => {
    it('keeps the last collapsed state and flips it from there', () => {
      const { rerender } = renderCollapsibleSidebar({ collapsed: true })

      rerender(<CollapsibleSidebar />)

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText('Collapsed logo')).toBeInTheDocument()

      fireEvent.click(getCollapseButton())

      expect(getCollapseButton()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText('Full logo')).toBeInTheDocument()
    })
  })

  describe('when the sidebar is not collapsible', () => {
    it('ignores defaultCollapsed', () => {
      renderCollapsibleSidebar({ collapsible: false, defaultCollapsed: true })

      expect(screen.getByText('Full logo')).toBeInTheDocument()
    })

    it('ignores the collapsed prop', () => {
      renderCollapsibleSidebar({ collapsible: false, collapsed: true })

      expect(screen.getByText('Full logo')).toBeInTheDocument()
    })
  })
})
