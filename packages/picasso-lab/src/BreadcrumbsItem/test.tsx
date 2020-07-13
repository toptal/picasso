import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import BreadcrumbsItem, { Props } from './BreadcrumbsItem'

jest.mock('ap-style-title-case')

const renderBreadcrumbsItem = (props: Props, picassoConfig?: PicassoConfig) => {
  const { active, titleCase, children } = props

  return render(
    <BreadcrumbsItem active={active} titleCase={titleCase}>
      {children}
    </BreadcrumbsItem>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance
beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

test('should transform text to title case when Picasso titleCase property is true', () => {
  const TEXT_CONTENT = 'Test ab3'
  renderBreadcrumbsItem(
    { active: false, children: TEXT_CONTENT },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderBreadcrumbsItem(
    { active: false, titleCase: false },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledTimes(0)
})
