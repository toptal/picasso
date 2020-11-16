import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Switch, { Props } from './Switch'

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

it('renders default Switch without label', () => {
  const { queryByTestId } = renderSwitch({})

  expect(queryByTestId('switch')).toBeInTheDocument()
})

it('renders default Switch with label', () => {
  const { queryByTestId, queryByText } = renderSwitch({ label: 'A Switch' })

  expect(queryByTestId('switch')).toBeInTheDocument()
  expect(queryByText('A Switch')).toBeInTheDocument()
})

it('renders disabled state', () => {
  const { queryByTestId, queryByText } = renderSwitch({
    disabled: true,
    label: 'Disabled'
  })

  const Switch = queryByTestId('switch')
  const className = Switch?.className || ''

  expect(Switch).toBeInTheDocument()
  expect(/Mui-disabled/.test(className)).toBe(true)
  expect(queryByText('Disabled')).toBeInTheDocument()
})

it('transforms text to title case when Picasso titleCase property is true', () => {
  const { queryByText } = renderSwitch(
    { label: 'abc ac4' },
    { titleCase: true }
  )

  expect(queryByText('Abc Ac4')).toBeInTheDocument()
})

it('transforms text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  const { queryByText } = renderSwitch(
    { label: 'abc dp3', titleCase: false },
    { titleCase: true }
  )

  expect(queryByText('abc dp3')).toBeInTheDocument()
})

it('behaves correctly when interacting', () => {
  const onChange = jest.fn()
  const label = 'Switch'

  const { getByLabelText, getByTestId } = renderSwitch({ onChange, label })
  const switchLabel = getByLabelText(label)

  expect(switchLabel).toBeInTheDocument()

  fireEvent.click(switchLabel)
  expect(onChange).toHaveBeenCalled()

  expect(/Mui-checked/.test(getByTestId('switch').className)).toBe(true)
})
