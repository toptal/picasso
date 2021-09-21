import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import ButtonCheckbox, { Props } from './ButtonCheckbox'

const renderButtonCheckbox = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  return render(<ButtonCheckbox {...props} />, undefined, picassoConfig)
}

describe('ButtonCheckbox', () => {
  it('renders', () => {
    const { container } = renderButtonCheckbox({ children: 'Click me!' })

    expect(container).toMatchSnapshot()
  })

  it('changes value of checkbox when clicking on button', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonCheckbox({
      children: 'Click me!',
      onChange,
      'data-testid': 'button'
    })

    fireEvent.click(getByTestId('button'))

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true)
  })

  it('changes value of checkbox when clicking on checkbox', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonCheckbox({
      children: 'Click me!',
      onChange,
      testIds: { checkbox: 'checkbox' }
    })

    fireEvent.click(getByTestId('checkbox'))

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true)
  })

  it('ignores clicks when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = renderButtonCheckbox({
      children: 'Click me!',
      onChange,
      testIds: { checkbox: 'checkbox' },
      'data-testid': 'button',
      disabled: true
    })

    fireEvent.click(getByTestId('checkbox'))
    fireEvent.click(getByTestId('button'))

    expect(onChange).not.toHaveBeenCalled()
  })
})
