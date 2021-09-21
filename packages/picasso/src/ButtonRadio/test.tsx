import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import ButtonRadio, { Props } from './ButtonRadio'

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
      'data-testid': 'button'
    })

    fireEvent.click(getByTestId('button'))

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true)
  })

  it('changes value of radio when clicking on radio', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      onChange,
      testIds: { radio: 'radio' }
    })

    fireEvent.click(getByTestId('radio'))

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true)
  })

  it('ignores clicks when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonRadio({
      children: 'Click me!',
      onChange,
      testIds: { radio: 'radio' },
      'data-testid': 'button',
      disabled: true
    })

    fireEvent.click(getByTestId('radio'))
    fireEvent.click(getByTestId('button'))

    expect(onChange).not.toHaveBeenCalled()
  })
})
