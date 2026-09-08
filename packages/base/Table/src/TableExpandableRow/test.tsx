import React from 'react'
import { act, cleanup, render } from '@toptal/picasso-test-utils'

import { TableCompound as Table } from '../TableCompound'
import type { Props } from './TableExpandableRow'

const CONTENT = 'Expandable row content'
const TRIGGER = 'Task'
const TRANSITION_DURATION = 350

const buildTable = (props: Omit<Partial<Props>, 'children'> = {}) => (
  <Table>
    <Table.Body>
      <Table.ExpandableRow content={<div>{CONTENT}</div>} {...props}>
        <Table.Cell>{TRIGGER}</Table.Cell>
      </Table.ExpandableRow>
    </Table.Body>
  </Table>
)

const renderComponent = (props: Omit<Partial<Props>, 'children'> = {}) =>
  render(buildTable(props))

const contentCell = (content: HTMLElement) => content.closest('td')
const contentRow = (content: HTMLElement) => content.closest('tr')
const collapse = (content: HTMLElement) =>
  content.closest('[class*="transition-[height]"]')

const runTransition = () =>
  act(() => {
    jest.advanceTimersByTime(TRANSITION_DURATION)
  })

describe('TableExpandableRow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    jest.useRealTimers()
  })

  it('renders collapsed', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  it('renders expanded', () => {
    const { container } = renderComponent({
      expanded: true,
      defaultExpanded: true,
    })

    expect(container).toMatchSnapshot()
  })

  it('does not render the content row while collapsed', () => {
    const { container, queryByText } = renderComponent()

    expect(queryByText(CONTENT)).not.toBeInTheDocument()
    expect(container.querySelectorAll('tr')).toHaveLength(1)
  })

  it('spans every column by default', () => {
    const { getByText } = renderComponent({ expanded: true })

    expect(contentCell(getByText(CONTENT))).toHaveAttribute('colspan', '100')
  })

  it('spans the given number of columns', () => {
    const { getByText } = renderComponent({ expanded: true, colSpan: 6 })

    expect(contentCell(getByText(CONTENT))).toHaveAttribute('colspan', '6')
  })

  it('keeps colSpan off the row itself', () => {
    const { getByText } = renderComponent({ expanded: true, colSpan: 6 })

    expect(getByText(TRIGGER).closest('tr')).not.toHaveAttribute('colspan')
  })

  it('forwards className to both rows', () => {
    const { getByText } = renderComponent({
      expanded: true,
      className: 'custom',
    })

    expect(getByText(TRIGGER).closest('tr')).toHaveClass('custom')
    expect(contentRow(getByText(CONTENT))).toHaveClass('custom')
  })

  it('shades the content row when stripeEven is set', () => {
    const { getByText } = renderComponent({ expanded: true, stripeEven: true })

    expect(contentRow(getByText(CONTENT))).toHaveClass('bg-gray-200/[0.32]')
  })

  it('grows from zero height when it opens', () => {
    const { getByText } = renderComponent({ expanded: true })
    const content = getByText(CONTENT)

    // already transitioning, but still at the height it has to grow from
    expect(collapse(content)).not.toHaveClass('invisible')
    expect(collapse(content)).toHaveStyle({ height: '0px' })

    runTransition()

    expect(collapse(content)).toHaveStyle({ height: 'auto' })
  })

  it('shows a defaultExpanded row without a transition', () => {
    const { getByText } = renderComponent({
      expanded: true,
      defaultExpanded: true,
    })

    expect(collapse(getByText(CONTENT))).toHaveStyle({ height: 'auto' })
  })

  it('keeps the content mounted while it collapses, then unmounts it', () => {
    const { getByText, queryByText, rerender } = renderComponent({
      expanded: true,
    })

    runTransition()
    act(() => {
      rerender(buildTable({ expanded: false }))
    })

    const content = getByText(CONTENT)

    expect(contentRow(content)).toHaveClass('border-b-0')
    expect(collapse(content)).toHaveStyle({ height: '0px' })

    runTransition()

    expect(queryByText(CONTENT)).not.toBeInTheDocument()
  })

  it('never unmounts the content when it reopens mid-collapse', () => {
    const { getByText, rerender } = renderComponent({ expanded: true })

    runTransition()

    const content = getByText(CONTENT)

    act(() => {
      rerender(buildTable({ expanded: false }))
    })
    act(() => {
      jest.advanceTimersByTime(TRANSITION_DURATION / 2)
    })
    act(() => {
      rerender(buildTable({ expanded: true }))
    })
    // long enough for a stale exit callback to have fired
    runTransition()
    runTransition()

    expect(getByText(CONTENT)).toBe(content)
  })
})
