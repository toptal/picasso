import React from 'react'
import { render } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Tab, { Props } from './Tab'

const renderTab = (props: OmitInternalProps<Props>) => {
  const { label, disabled, icon } = props

  return render(<Tab label={label} disabled={disabled} icon={icon} />)
}

describe('Tab', () => {
  test('default render', () => {
    const { container } = renderTab({
      label: 'Tab Label'
    })

    expect(container).toMatchSnapshot()
  })

  test('disabled tab', () => {
    const { container } = renderTab({
      label: 'Tab Label',
      disabled: true
    })

    expect(container).toMatchSnapshot()
  })

  test('tab with icon', () => {
    const Icon = () => <div id='Icon' />
    const { container } = renderTab({
      label: 'Tab Label',
      icon: <Icon />
    })

    expect(container).toMatchSnapshot()
  })
})
