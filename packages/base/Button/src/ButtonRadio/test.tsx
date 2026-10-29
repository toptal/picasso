import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { FOCUS_RING } from '@toptal/picasso-shared'

import type { Props } from './ButtonRadio'
import ButtonRadio from './ButtonRadio'

const renderButtonRadio = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  return render(<ButtonRadio {...props} />, undefined, picassoConfig)
}

describe('ButtonRadio', () => {
  it('renders', () => {
    const { container } = renderButtonRadio({ children: 'Click me!' })

    expect(container).toMatchSnapshot()
  })

  it('changes value of radio when clicking on button', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      onChange,
      'data-testid': 'button',
    })

    const anyChangeEvent = expect.anything()

    fireEvent.click(getByTestId('button'))
    expect(onChange).toHaveBeenCalledWith(anyChangeEvent, true)

    fireEvent.click(getByTestId('button'))
    expect(onChange).toHaveBeenCalledWith(anyChangeEvent, true)
  })

  it('changes value of radio when clicking on radio', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      onChange,
      testIds: { radio: 'radio' },
    })

    fireEvent.click(getByTestId('radio'))

    const anyChangeEvent = expect.anything()

    expect(onChange).toHaveBeenCalledWith(anyChangeEvent, true)
  })

  it('passes data-private to the label', () => {
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      'data-testid': 'button',
      'data-private': true,
    })

    expect(getByTestId('button')).toHaveAttribute('data-private', 'true')
  })

  it('leaves the radio, named by the label, as the only control', () => {
    const { getByRole, queryByRole } = renderButtonRadio({
      children: 'Click me!',
    })

    expect(getByRole('radio', { name: 'Click me!' })).toBeInTheDocument()
    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('rings the label while the radio inside it has keyboard focus', () => {
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      'data-testid': 'button',
    })

    expect(getByTestId('button')).toHaveClass(FOCUS_RING.blue.hasFocusVisible)
  })

  it('does not ring the label when disabled', () => {
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      'data-testid': 'button',
      disabled: true,
    })

    expect(getByTestId('button')).not.toHaveClass(
      FOCUS_RING.blue.hasFocusVisible
    )
  })

  it('ignores clicks when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      onChange,
      testIds: { radio: 'radio' },
      'data-testid': 'button',
      disabled: true,
    })

    fireEvent.click(getByTestId('radio'))
    fireEvent.click(getByTestId('button'))

    expect(onChange).not.toHaveBeenCalled()
  })
})
