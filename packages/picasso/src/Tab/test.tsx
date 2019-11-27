import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Tab, { Props } from './Tab'

const renderTab = (props: OmitInternalProps<Props>) => {
  const { label, disabled } = props

  return render(<Tab label={label} disabled={disabled} />)
}

afterEach(cleanup)

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
})
