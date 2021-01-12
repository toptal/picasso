/* eslint-disable react/no-multi-comp */
import React from 'react'
import { render, fireEvent, wait } from '@toptal/picasso/test-utils'

import Accordion from './Accordion'

const exampleContent =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta harum explicabo assumenda doloribus voluptatum cum culpa! Molestias voluptatem placeat at velit vero animi, nostrum culpa, unde aliquam magnam libero eius.'
const exampleSummary = 'Lorem ipsum'

const getSummaryContainer = (container: HTMLElement) =>
  container.querySelector('[aria-expanded]') as HTMLElement

describe('Accordion', () => {
  test('renders successfully', () => {
    const { container } = render(
      <Accordion content={exampleContent}>{exampleSummary}</Accordion>
    )

    expect(container).toMatchSnapshot()
  })

  test('renders none when no summary', () => {
    const { container } = render(<Accordion content={exampleContent} />)

    expect(container).toMatchSnapshot()
  })

  test('renders disabled', async () => {
    const { container } = render(
      <Accordion content={exampleContent} disabled>
        {exampleSummary}
      </Accordion>
    )

    // MUI disabled state adds `pointer-events: none` style rule to the summary container.
    // It can't be tested via RTL because firing events ignores this rule.
    expect(container).toMatchSnapshot()
  })

  test('renders expanded initially', async () => {
    const { getByText } = render(
      <Accordion content={exampleContent} defaultExpanded>
        {exampleSummary}
      </Accordion>
    )

    expect(getByText(exampleContent)).toBeVisible()
    fireEvent.click(getByText(exampleSummary))
    await wait(() => expect(getByText(exampleContent)).not.toBeVisible())
  })

  test('renders custom icon when passed', () => {
    const { getByTestId } = render(
      <Accordion
        content={exampleContent}
        expandIcon={<span data-testid='custom-expand-icon' />}
      >
        {exampleSummary}
      </Accordion>
    )

    expect(getByTestId('custom-expand-icon')).toBeInTheDocument()
  })

  test('toggles when controlled', async () => {
    const { getByText, rerender } = render(
      <Accordion content={exampleContent} expanded={false}>
        {exampleSummary}
      </Accordion>
    )

    expect(getByText(exampleContent)).not.toBeVisible()

    rerender(
      <Accordion content={exampleContent} expanded>
        {exampleSummary}
      </Accordion>
    )

    expect(getByText(exampleContent)).toBeVisible()
  })

  test('toggles', async () => {
    const handleChange = jest.fn()
    const { container, getByText, getByTestId } = render(
      <Accordion
        content={exampleContent}
        onChange={handleChange}
        expandIcon={<span data-testid='trigger' />}
      >
        {exampleSummary}
      </Accordion>
    )

    fireEvent.click(getSummaryContainer(container))
    await wait(() => expect(getByText(exampleContent)).toBeVisible())

    fireEvent.click(getByTestId('trigger'))
    await wait(() => expect(getByText(exampleContent)).not.toBeVisible())

    expect(handleChange).toBeCalledTimes(2)
  })
})
