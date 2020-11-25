import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import TagRectangular, { Props } from './TagRectangular'

jest.mock('ap-style-title-case')

const renderTag = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const { indicator, titleCase } = props

  return render(
    <TagRectangular indicator={indicator} titleCase={titleCase}>
      {children}
    </TagRectangular>,
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

describe('TagRectangular', () => {
  it('renders rectangular Tag', () => {
    const { container } = renderTag('Reactangular Tag', {})

    expect(container).toMatchSnapshot()
  })

  it('renders rectangular Tag with indicator', () => {
    const { container } = renderTag('Reactangular Tag', { indicator: 'blue' })

    expect(container).toMatchSnapshot()
  })

  describe('when Picasso titleCase property is true', () => {
    it('transforms text to title case', () => {
      const TEXT_CONTENT = 'Test ld7'

      renderTag(TEXT_CONTENT, {}, { titleCase: true })

      expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
    })
  })

  describe('when Picasso titleCase property is true but the component property overrides it', () => {
    it('does not transform text to title case ', () => {
      renderTag('test pf9', { titleCase: false }, { titleCase: true })
      expect(spiedOnTitleCase).toBeCalledTimes(0)
    })
  })
})
