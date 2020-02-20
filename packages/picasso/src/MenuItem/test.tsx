import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test_utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import MenuItem, { Props } from '../MenuItem'

const TestMenuItem: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  menu
}) => <MenuItem menu={menu}>{children}</MenuItem>

describe('MenuItem', () => {
  test('default render', () => {
    const { container } = render(<TestMenuItem>Item</TestMenuItem>)

    expect(container).toMatchSnapshot()
  })

  test('has chevron if has nested menu', () => {
    const { container } = render(
      <TestMenuItem menu={<div />}>Item</TestMenuItem>
    )

    expect(container).toMatchSnapshot()
  })
})
