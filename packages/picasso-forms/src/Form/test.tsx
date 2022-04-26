import React from 'react'
import { fireEvent, render, waitFor, act } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso'

import Form, { Props } from './Form'
import { scrollTo } from '../utils/scroll-to'

jest.mock('../utils', () => {
  const actualUtils = jest.requireActual('../utils')

  return {
    ...actualUtils,
    createScrollToErrorDecorator: jest.requireActual(
      '../utils/scroll-to-error-decorator'
    ).default
  }
})
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

const scrollToMock = scrollTo as jest.Mock

describe('Form', () => {
  beforeEach(() => {
    scrollToMock.mockReset()
  })

  it('renders', async () => {
    const { container, getByText } = renderForm({
      onSubmit: () => {},
      mandatory: false
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledTimes(0)
      expect(container).toMatchSnapshot()
    })
  })

  it('renders with an error', async () => {
    const { container, getByText } = renderForm({
      onSubmit: () => Promise.resolve({ test: 'Some error' }),
      mandatory: true
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
    })
  })

  it('when `disableScrollOnError` is specified', async () => {
    const { getByText } = renderForm({
      onSubmit: () => ({ test: 'Some error' }),
      disableScrollOnError: true,
      mandatory: true
    })

    await act(() => {
      fireEvent.click(getByText('Submit'))
    })

    await waitFor(() => {
      expect(scrollToMock).not.toHaveBeenCalled()
    })
  })
})
