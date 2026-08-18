import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

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

  it('rings the label while the radio inside it holds focus', () => {
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      'data-testid': 'button',
    })

    expect(getByTestId('button').className).toContain(
      'focus-within:shadow-[0_0_0_3px_rgba(32,78,207,0.48)]'
    )
  })

  it('does not ring the label when disabled', () => {
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      'data-testid': 'button',
      disabled: true,
    })

    expect(getByTestId('button').className).not.toContain(
      'focus-within:shadow-'
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
