import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso'

import Form, { Props } from './Form'
import { scrollTo } from '../utils/scroll-to'

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  createScrollToErrorDecorator: jest.requireActual(
    '../utils/scroll-to-error-decorator'
  ).default
}))
jest.mock('../utils/scroll-to', () => ({
  scrollTo: jest.fn()
}))

const renderForm = (
  props: OmitInternalProps<Props> & { mandatory?: boolean }
) => {
  const { onSubmit, disableScrollOnError, mandatory } = props

  return render(
    <Form
      data-testid='form'
      onSubmit={onSubmit}
      disableScrollOnError={disableScrollOnError}
    >
      <Form.Input name='test' placeholder='test input' required={mandatory} />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

/**
 * form submit does not return Promise or accept callback,
 * so there is no way to know when an error is displayed
 */
const waitForFormToDisplayErrors = () =>
  new Promise(resolve => setTimeout(resolve, 100))

const scrollToMock = scrollTo as jest.Mock

describe('Form', () => {
  beforeEach(() => {
    scrollToMock.mockReset()
  })

  it('renders', async () => {
    const { container, findByTestId } = renderForm({
      onSubmit: () => {},
      mandatory: false
    })

    const formElement = await findByTestId('form')

    fireEvent.submit(formElement)

    await waitForFormToDisplayErrors()

    expect(scrollToMock).toHaveBeenCalledTimes(0)
    expect(container).toMatchSnapshot()
  })

  it('renders with an error', async () => {
    const { container, findByTestId } = renderForm({
      onSubmit: () => Promise.resolve({ test: 'Some error' }),
      mandatory: true
    })

    const formElement = await findByTestId('form')

    fireEvent.submit(formElement)

    await waitForFormToDisplayErrors()

    expect(scrollToMock).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
  })

  it('when `disableScrollOnError` is specified', async () => {
    const { findByTestId } = renderForm({
      onSubmit: () => ({ test: 'Some error' }),
      disableScrollOnError: true,
      mandatory: true
    })

    const formElement = await findByTestId('form')

    fireEvent.submit(formElement)

    await waitForFormToDisplayErrors()

    expect(scrollToMock).not.toHaveBeenCalled()
  })
})
