import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import { TagRectangular } from './TagRectangular'
import type { Props } from './types'

jest.mock('ap-style-title-case')

const renderTag = (
  children: string,
  { titleCase }: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) =>
  render(
    <TagRectangular titleCase={titleCase}>{children}</TagRectangular>,
    undefined,
    picassoConfig
  )

// Mock console error since toThrow() outputs the error message with stacktrace
let mockedConsoleError: jest.SpyInstance
let spiedOnTitleCase: jest.SpyInstance

describe('TagRectangular', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
    mockedConsoleError = jest.spyOn(console, 'error')
    mockedConsoleError.mockImplementation(() => {})
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
    mockedConsoleError.mockRestore()
  })
  it('renders rectangular Tag', () => {
    const { container } = renderTag('Reactangular Tag', {})

    expect(container).toMatchSnapshot()
  })

  describe('when Picasso titleCase property is true', () => {
    it('transforms text to title case', () => {
      const TEXT_CONTENT = 'Test ld7'

      renderTag(TEXT_CONTENT, {}, { titleCase: true })

      expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
    })
  })

  describe('when Picasso titleCase property is true but the component property overrides it', () => {
    it('does not transform text to title case', () => {
      renderTag('test pf9', { titleCase: false }, { titleCase: true })
      expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
    })
  })
})
