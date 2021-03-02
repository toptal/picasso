import React from 'react'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { render, fireEvent, waitFor } from '@toptal/picasso/test-utils'

import Accordion, { Props } from './Accordion'

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

const renderAccordion = (props?: Partial<OmitInternalProps<Props>>) =>
  render(
    <Accordion content={<TestDetails />} {...props}>
      <TestSummary />
    </Accordion>
  )

describe('Accordion', () => {
  it('renders collapsed by default', () => {
    const {
      container,
      queryByTestId,
      getByText,
      getByTestId
    } = renderAccordion()

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

    const { getByText, getByTestId } = renderAccordion({
      onChange: handleChange,
      expandIcon: <span data-testid='trigger' />
    })

    fireEvent.click(getByTestId('accordion-summary'))
    await waitFor(() => expect(getByText(DETAILS_TEXT)).toBeVisible())

    fireEvent.click(getByTestId('trigger'))
    await waitFor(() => expect(getByText(DETAILS_TEXT)).not.toBeVisible())

    fireEvent.click(getByText(SUMMARY_TEXT))
    await waitFor(() => expect(getByText(DETAILS_TEXT)).toBeVisible())

    expect(handleChange).toHaveBeenCalledTimes(3)
  })

  it('renders disabled', async () => {
    const { container } = renderAccordion({ disabled: true })

    // MUI disabled state adds `pointer-events: none` style rule to the summary container.
    // It can't be tested programmatically `fireEvent` ignores this rule.
    expect(container).toMatchSnapshot()
  })

  it('renders expanded initially', async () => {
    const { getByText, getByTestId } = renderAccordion({
      defaultExpanded: true
    })

    expect(getByTestId('accordion-details')).toBeVisible()
    expect(getByText(DETAILS_TEXT)).toBeVisible()

    fireEvent.click(getByTestId('accordion-summary'))

    await waitFor(() => {
      expect(getByTestId('accordion-details')).not.toBeVisible()
      expect(getByText(DETAILS_TEXT)).not.toBeVisible()
    })
  })

  it('renders custom icon when passed', () => {
    const { getByTestId, container } = renderAccordion({
      expandIcon: <span data-testid='custom-expand-icon' />
    })

    expect(getByTestId('custom-expand-icon')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('passes styles correctly', () => {
    const { getByTestId } = renderAccordion({
      'data-testid': 'accordion',
      className: 'foobar',
      style: { display: 'table' }
    })

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
