import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Switch'
import { Switch } from './Switch'

const renderSwitch = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { label, disabled, titleCase, onChange } = props

  return render(
    <Switch
      disabled={disabled}
      label={label}
      onChange={onChange}
      titleCase={titleCase}
      data-testid='switch'
    />,
    undefined,
    picassoConfig
  )
}

describe('Switch', () => {
  it('renders default Switch without label', () => {
    const { container } = renderSwitch({})

    expect(container).toMatchSnapshot()
  })

  it('renders default Switch with label', () => {
    const { getByTestId } = renderSwitch({ label: 'A Switch' })

    expect(getByTestId('switch')).toHaveTextContent('A Switch')
  })

  it('renders disabled state', () => {
    const { getByTestId } = renderSwitch({
      disabled: true,
      label: 'Disabled',
    })

    expect(getByTestId('switch')).toMatchSnapshot()
  })

  it('transforms text to title case when Picasso titleCase property is true', () => {
    const { getByTestId } = renderSwitch(
      { label: 'abc ac4' },
      { titleCase: true }
    )

    expect(getByTestId('switch')).toHaveTextContent('Abc Ac4')
  })

  it('transforms text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    const { getByTestId } = renderSwitch(
      { label: 'abc dp3', titleCase: false },
      { titleCase: true }
    )

    expect(getByTestId('switch')).toHaveTextContent('abc dp3')
  })

  it('behaves correctly when interacting', () => {
    const onChange = jest.fn()
    const label = 'Switch'

    const { getByTestId } = renderSwitch({ onChange, label })

    fireEvent.click(getByTestId('switch'))

    expect(onChange).toHaveBeenCalled()
    expect(getByTestId('switch')).toMatchSnapshot()
  })

  describe('single label-associated node (PF-2244)', () => {
    it('matches getByLabelText once and resolves to the accessible control', () => {
      const { getByLabelText, getByRole } = renderSwitch({ label: 'A Switch' })

      // Regression: the base-ui control renders a role="switch" span plus a
      // hidden native <input>. Both used to be label-associated, so
      // getByLabelText threw "Found multiple elements". It must now match
      // exactly the accessible control.
      expect(getByLabelText('A Switch')).toBe(
        getByRole('switch', { name: 'A Switch' })
      )
    })

    it('toggles when the label text is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderSwitch({ label: 'A Switch', onChange })

      fireEvent.click(getByText('A Switch'))

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('does not toggle when disabled and the label text is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderSwitch({
        label: 'A Switch',
        disabled: true,
        onChange,
      })

      fireEvent.click(getByText('A Switch'))

      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
