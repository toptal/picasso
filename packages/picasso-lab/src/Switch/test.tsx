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
    label: 'Disabled'
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
