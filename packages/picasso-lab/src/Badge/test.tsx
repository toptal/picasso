import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Badge, { Props } from './Badge'

jest.mock('ap-style-title-case')

const renderBadge = (
  content: string,
  props: OmitInternalProps<Props, 'children' | 'content'>,
  picassoConfig?: PicassoConfig
) => {
  const { variant, titleCase } = props

  return render(
    <Badge content={content} variant={variant} titleCase={titleCase}>
      abc
    </Badge>,
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

test('renders Badge', () => {
  const { container } = renderBadge('Badge content', {})

  expect(container).toMatchSnapshot()
})

test('should transform text to title case when Picasso titleCase property is true', () => {
  const TEXT_CONTENT = 'Test ao4'

  renderBadge(TEXT_CONTENT, {}, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderBadge('test pe2', { titleCase: false }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledTimes(0)
})
