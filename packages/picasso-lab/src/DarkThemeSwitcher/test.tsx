import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import DarkThemeSwitcher, { Props } from './DarkThemeSwitcher'

const renderSwitcher = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { variant, onChange, checked } = props

  return render(
    <DarkThemeSwitcher
      variant={variant}
      onChange={onChange}
      checked={checked}
      data-testid='switch'
    />,
    undefined,
    picassoConfig
  )
}

describe('DarkThemeSwitcher', () => {
  it('renders dark variant', () => {
    const { container } = renderSwitcher({ variant: 'dark', checked: true })

    expect(container).toMatchSnapshot()
  })

  it('renders light variant', () => {
    const { container } = renderSwitcher({ variant: 'light', checked: false })

    expect(container).toMatchSnapshot()
  })
})
