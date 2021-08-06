import React from 'react'
import { render, PicassoConfig, screen } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Badge, { Props } from './Badge'

jest.mock('ap-style-title-case')

const renderBadge = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { content, variant, titleCase } = props

  return render(
    <Badge
      content={content}
      variant={variant}
      titleCase={titleCase}
      data-testid={props['data-testid']}
    />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Badge', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = renderBadge({ content: 'Badge content' })

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test ao4'

    renderBadge({ content: TEXT_CONTENT }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderBadge({ content: 'test pe2', titleCase: false }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  it('should render data-testid', () => {
    renderBadge({ content: 'test pe2', 'data-testid': 'badge-root' })

    expect(screen.getByTestId('badge-root')).toBeInTheDocument()
  })
})
