import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import BreadcrumbsItem, { Props } from './BreadcrumbsItem'

jest.mock('ap-style-title-case')

const renderBreadcrumbsItem = (
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const { active, titleCase } = props

  return render(
    <BreadcrumbsItem active={active} titleCase={titleCase}>
      Test
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
  renderBreadcrumbsItem({ active: false }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledTimes(1)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderBreadcrumbsItem(
    { active: false, titleCase: false },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledTimes(0)
})
