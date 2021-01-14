import React from 'react'
import { render, fireEvent, wait } from '@toptal/picasso/test-utils'

import Accordion from './Accordion'

const DETAILS =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta harum explicabo assumenda doloribus voluptatum cum culpa! Molestias voluptatem placeat at velit vero animi, nostrum culpa, unde aliquam magnam libero eius.'
const SUMMARY = 'Lorem ipsum'

describe('Accordion', () => {
  it('renders collapsed by default', () => {
    const { container, queryByTestId, getByText, getByTestId } = render(
      <Accordion content={DETAILS}>{SUMMARY}</Accordion>
    )

    expect(queryByTestId('empty-accordion-summary')).toBeNull()

    expect(getByTestId('accordion-summary')).toBeVisible()
    expect(getByText(SUMMARY)).toBeVisible()

    expect(getByTestId('accordion-details')).not.toBeVisible()
    expect(getByText(DETAILS)).not.toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('renders empty summary when a custom one is not provided', () => {
    const { getByTestId, queryByTestId } = render(
      <Accordion content={DETAILS} />
    )

    expect(getByTestId('empty-accordion-summary')).toBeVisible()
    expect(queryByTestId('accordion-summary')).toBeNull()
    expect(getByTestId('accordion-details')).not.toBeVisible()
  })

  it('toggles', async () => {
    const handleChange = jest.fn()
    const { getByText, getByTestId } = render(
      <Accordion
        content={DETAILS}
        onChange={handleChange}
        expandIcon={<span data-testid='trigger' />}
      >
        {SUMMARY}
      </Accordion>
    )

    fireEvent.click(getByTestId('accordion-summary'))
    await wait(() => expect(getByText(DETAILS)).toBeVisible())

    fireEvent.click(getByTestId('trigger'))
    await wait(() => expect(getByText(DETAILS)).not.toBeVisible())

    fireEvent.click(getByText(SUMMARY))
    await wait(() => expect(getByText(DETAILS)).toBeVisible())

    expect(handleChange).toBeCalledTimes(3)
  })

  test('renders disabled', async () => {
    const { container } = render(
      <Accordion content={DETAILS} disabled>
        {SUMMARY}
      </Accordion>
    )

    // MUI disabled state adds `pointer-events: none` style rule to the summary container.
    // It can't be tested programmatically `fireEvent` ignores this rule.
    expect(container).toMatchSnapshot()
  })

  it('renders expanded initially', async () => {
    const { getByText, getByTestId } = render(
      <Accordion content={DETAILS} defaultExpanded>
        {SUMMARY}
      </Accordion>
    )

    expect(getByTestId('accordion-details')).toBeVisible()
    expect(getByText(DETAILS)).toBeVisible()

    fireEvent.click(getByTestId('accordion-summary'))

    await wait(() => {
      expect(getByTestId('accordion-details')).not.toBeVisible()
      expect(getByText(DETAILS)).not.toBeVisible()
    })
  })

  it('renders custom icon when passed', () => {
    const { getByTestId, container } = render(
      <Accordion
        content={DETAILS}
        expandIcon={<span data-testid='custom-expand-icon' />}
      >
        {SUMMARY}
      </Accordion>
    )

    expect(getByTestId('custom-expand-icon')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('passes styles correctly', () => {
    const { getByTestId } = render(
      <Accordion
        data-testid='accordion'
        className='foobar'
        style={{ display: 'table' }}
        content={DETAILS}
      >
        {SUMMARY}
      </Accordion>
    )

    const accordionContainer = getByTestId('accordion')

    expect(accordionContainer).toHaveStyle('display: table;')
    expect(accordionContainer.classList.contains('foobar')).toBeTruthy()
  })

  it('toggles when controlled', async () => {
    const { getByText, rerender } = render(
      <Accordion content={DETAILS} expanded={false}>
        {SUMMARY}
      </Accordion>
    )

    expect(getByText(DETAILS)).not.toBeVisible()

    rerender(
      <Accordion content={DETAILS} expanded>
        {SUMMARY}
      </Accordion>
    )

    expect(getByText(DETAILS)).toBeVisible()
  })
})

describe('Accordion.Summary', () => {
  it('renders', () => {
    const { container } = render(
      <Accordion.Summary>{SUMMARY}</Accordion.Summary>
    )

    expect(container).toMatchSnapshot()
  })
})

describe('Accordion.Details', () => {
  it('renders', () => {
    const { container } = render(
      <Accordion.Details>{DETAILS}</Accordion.Details>
    )

    expect(container).toMatchSnapshot()
  })
})
