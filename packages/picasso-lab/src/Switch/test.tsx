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
      data-testid='Switch'
    />,
    undefined,
    picassoConfig
  )
}

it('renders default Switch without label', () => {
  const { queryByTestId } = renderSwitch({})

  expect(queryByTestId('Switch')).toBeInTheDocument()
})

it('renders default Switch with label', () => {
  const { queryByTestId, queryByText } = renderSwitch({ label: 'A Switch' })

  expect(queryByTestId('Switch')).toBeInTheDocument()
  expect(queryByText('A Switch')).toBeInTheDocument()
})

it('renders disabled state', () => {
  const { queryByTestId, queryByText } = renderSwitch({
    disabled: true,
    label: 'Disabled'
  })

  expect(queryByTestId('Switch')).toBeInTheDocument()
  expect(/Mui-disabled/.test(queryByTestId('Switch')?.className)).toBe(true)
  expect(queryByText('Disabled')).toBeInTheDocument()
})

it('transforms text to title case when Picasso titleCase property is true', () => {
  const LABEL_TEXT = 'abc ac4'

  const { queryByText } = renderSwitch(
    { label: LABEL_TEXT },
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
  const SwitchLabel = getByLabelText(label)

  expect(SwitchLabel).toBeInTheDocument()

  fireEvent.click(SwitchLabel)
  expect(onChange).toHaveBeenCalled()

  expect(/Mui-checked/.test(getByTestId('Switch').className)).toBe(true)
})
