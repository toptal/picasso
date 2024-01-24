import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import type { Props } from './BreadcrumbsItem'
import { BreadcrumbsItem } from './BreadcrumbsItem'

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

describe('BreadcrumbsItem', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test ab3'

    renderBreadcrumbsItem(
      { active: false, children: TEXT_CONTENT },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderBreadcrumbsItem(
      { active: false, titleCase: false },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
