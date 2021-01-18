import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import MenuItem, { Props } from '../MenuItem'

jest.mock('ap-style-title-case')

const TestMenuItem: FunctionComponent<OmitInternalProps<Props>> = ({
  children,
  titleCase,
  menu
}) => (
  <MenuItem menu={menu} titleCase={titleCase}>
    {children}
  </MenuItem>
)

let spiedOnTitleCase: jest.SpyInstance

describe('MenuItem', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = render(<TestMenuItem>Item</TestMenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('has chevron if has nested menu', () => {
    const { container } = render(
      <TestMenuItem menu={<div />}>Item</TestMenuItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test pb8'

    render(<TestMenuItem>{TEXT_CONTENT}</TestMenuItem>, undefined, {
      titleCase: true
    })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    render(<TestMenuItem titleCase={false}>Item</TestMenuItem>, undefined, {
      titleCase: true
    })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
