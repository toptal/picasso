import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import OverlayBadge, { Props } from './OverlayBadge'

jest.mock('ap-style-title-case')

const renderOverlayBadge = (
  content: string,
  props: OmitInternalProps<Props, 'children' | 'content'>,
  picassoConfig?: PicassoConfig
) => {
  const { variant, titleCase } = props

  return render(
    <OverlayBadge content={content} variant={variant} titleCase={titleCase}>
      abc
    </OverlayBadge>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('OverlayBadge', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = renderOverlayBadge('OverlayBadge content', {})

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test as2'

    renderOverlayBadge(TEXT_CONTENT, {}, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderOverlayBadge('test ap4', { titleCase: false }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
