import React from 'react'
import { render, fireEvent, wait } from '@toptal/picasso/test-utils'

import Accordion from './Accordion'

const DETAILS_TEXT =
  'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
const SUMMARY_TEXT = 'What is a dog?'

const TestDetails = () => (
  <Accordion.Details data-testid='accordion-details'>
    {DETAILS_TEXT}
  </Accordion.Details>
)
const TestSummary = () => (
  <Accordion.Summary data-testid='accordion-summary'>
    {SUMMARY_TEXT}
  </Accordion.Summary>
)

describe('Accordion', () => {
  it('renders collapsed by default', () => {
    const { container, queryByTestId, getByText, getByTestId } = render(
      <Accordion content={<TestDetails />}>
        <TestSummary />
      </Accordion>
    )

    expect(queryByTestId('empty-accordion-summary')).toBeNull()

    expect(getByTestId('accordion-summary')).toBeVisible()
    expect(getByText(SUMMARY_TEXT)).toBeVisible()

    expect(getByTestId('accordion-details')).not.toBeVisible()
    expect(getByText(DETAILS_TEXT)).not.toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('renders empty summary when one is not provided', () => {
    const { getByTestId, queryByTestId } = render(
      <Accordion content={<TestDetails />} />
    )

    expect(getByTestId('picasso-empty-accordion-summary')).toBeVisible()
    expect(queryByTestId('accordion-summary')).toBeNull()
    expect(getByTestId('accordion-details')).not.toBeVisible()
  })

  it('toggles', async () => {
    const handleChange = jest.fn()
    const { getByText, getByTestId } = render(
      <Accordion
        content={<TestDetails />}
        onChange={handleChange}
        expandIcon={<span data-testid='trigger' />}
      >
        <TestSummary />
      </Accordion>
    )

    fireEvent.click(getByTestId('accordion-summary'))
    await wait(() => expect(getByText(DETAILS_TEXT)).toBeVisible())

    fireEvent.click(getByTestId('trigger'))
    await wait(() => expect(getByText(DETAILS_TEXT)).not.toBeVisible())

    fireEvent.click(getByText(SUMMARY_TEXT))
    await wait(() => expect(getByText(DETAILS_TEXT)).toBeVisible())

    expect(handleChange).toBeCalledTimes(3)
  })

  test('renders disabled', async () => {
    const { container } = render(
      <Accordion content={<TestDetails />} disabled>
        <TestSummary />
      </Accordion>
    )

    // MUI disabled state adds `pointer-events: none` style rule to the summary container.
    // It can't be tested programmatically `fireEvent` ignores this rule.
    expect(container).toMatchSnapshot()
  })

  it('renders expanded initially', async () => {
    const { getByText, getByTestId } = render(
      <Accordion content={<TestDetails />} defaultExpanded>
        <TestSummary />
      </Accordion>
    )

    expect(getByTestId('accordion-details')).toBeVisible()
    expect(getByText(DETAILS_TEXT)).toBeVisible()

    fireEvent.click(getByTestId('accordion-summary'))

    await wait(() => {
      expect(getByTestId('accordion-details')).not.toBeVisible()
      expect(getByText(DETAILS_TEXT)).not.toBeVisible()
    })
  })

  it('renders custom icon when passed', () => {
    const { getByTestId, container } = render(
      <Accordion
        content={<TestDetails />}
        expandIcon={<span data-testid='custom-expand-icon' />}
      >
        <TestSummary />
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
        content={<TestDetails />}
      >
        <TestSummary />
      </Accordion>
    )

    const accordionContainer = getByTestId('accordion')

    expect(accordionContainer).toHaveStyle('display: table;')
    expect(accordionContainer.classList.contains('foobar')).toBeTruthy()
  })

  it('toggles when controlled', async () => {
    const { getByText, rerender } = render(
      <Accordion content={<TestDetails />} expanded={false}>
        <TestSummary />
      </Accordion>
    )

    expect(getByText(DETAILS_TEXT)).not.toBeVisible()

    rerender(
      <Accordion content={<TestDetails />} expanded>
        <TestSummary />
      </Accordion>
    )

    expect(getByText(DETAILS_TEXT)).toBeVisible()
  })
})
