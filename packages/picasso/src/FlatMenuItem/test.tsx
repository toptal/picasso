import React, { FunctionComponent } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import FlatMenuItem, { FlatMenuItemProps } from '../FlatMenuItem'

jest.mock('ap-style-title-case')

const TestFlatMenuItem: FunctionComponent<OmitInternalProps<
  FlatMenuItemProps
>> = ({ children, titleCase, menu }) => (
  <FlatMenuItem menu={menu} titleCase={titleCase}>
    {children}
  </FlatMenuItem>
)

let spiedOnTitleCase: jest.SpyInstance

describe('FlatMenuItem', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = render(<TestFlatMenuItem>Item</TestFlatMenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('has chevron if has nested menu', () => {
    const { container } = render(
      <TestFlatMenuItem menu={<div />}>Item</TestFlatMenuItem>
    )

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test pb8'

    render(<TestFlatMenuItem>{TEXT_CONTENT}</TestFlatMenuItem>, undefined, {
      titleCase: true
    })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    render(
      <TestFlatMenuItem titleCase={false}>Item</TestFlatMenuItem>,
      undefined,
      {
        titleCase: true
      }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
