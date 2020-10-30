import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import OverviewBlock, { Props } from './OverviewBlock'

jest.mock('ap-style-title-case')

const renderOverviewBlock = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const { label, value, titleCase } = props

  return render(
    <OverviewBlock label={label} value={value} titleCase={titleCase}>
      {children}
    </OverviewBlock>,
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
  const LABEL_TEXT = 'abc dj4'

  renderOverviewBlock(
    'test abc123',
    { value: 'abc co5', label: LABEL_TEXT },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledWith(LABEL_TEXT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderOverviewBlock(
    'test abc456',
    { value: 'abc dk9', label: 'abc ps0', titleCase: false },
    { titleCase: true }
  )

  expect(spiedOnTitleCase).toBeCalledTimes(0)
})
