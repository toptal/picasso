import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { FOCUS_RING } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'
import { Settings16 } from '@toptal/picasso-icons'
import { Link } from '@toptal/picasso-link'

import type { Props } from './Tag'
import { Tag } from './Tag'
import { TagConnection } from '../TagConnection'

jest.mock('ap-style-title-case')

const renderTag = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const {
    onDelete,
    disabled,
    variant,
    titleCase,
    endAdornment,
    icon,
    as,
    href,
  } = props

  return render(
    <Tag
      data-testid='tag'
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      titleCase={titleCase}
      endAdornment={endAdornment}
      icon={icon}
      as={as}
      href={href}
    >
      {children}
    </Tag>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Tag', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders `light-grey` variant', () => {
    const { container } = renderTag('Tag', {})

    expect(container).toMatchSnapshot()
  })

  it('renders `blue` variant', () => {
    const { container } = renderTag('Tag', { variant: 'blue' })

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test bk9'

    renderTag(TEXT_CONTENT, {}, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderTag('test cl4', { titleCase: false }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('dismissable label', () => {
    let onDelete: () => void

    beforeEach(() => {
      onDelete = jest.fn()
    })
    it('should render dismissable label', () => {
      const { container } = renderTag('Tag', { onDelete })

      expect(container).toMatchSnapshot()
    })

    it('should fire onDelete event on dismiss action', () => {
      const { getByLabelText } = renderTag('Tag', { onDelete })
      const deleteIcon = getByLabelText('delete icon')

      fireEvent.click(deleteIcon)
      expect(onDelete).toHaveBeenCalled()
    })

    it('is a tab stop with a focus ring', () => {
      const { getByTestId } = renderTag('Tag', { onDelete })

      expect(getByTestId('tag')).toHaveAttribute('tabindex', '0')
      expect(getByTestId('tag')).toHaveClass(FOCUS_RING.blue.focusVisible)
    })

    it('is not a tab stop and has no focus ring when disabled', () => {
      const { getByTestId } = renderTag('Tag', { onDelete, disabled: true })

      expect(getByTestId('tag')).not.toHaveAttribute('tabindex')
      expect(getByTestId('tag')).not.toHaveClass(FOCUS_RING.blue.focusVisible)
    })
  })

  it('renders with adornment', () => {
    const { container } = renderTag('foobar', {
      endAdornment: <TagConnection>0</TagConnection>,
    })

    expect(container).toMatchSnapshot()
  })

  it('renders with connection and icon', () => {
    const { container } = renderTag('foobar', {
      endAdornment: <TagConnection>0</TagConnection>,
      icon: <Settings16 />,
    })

    expect(container).toMatchSnapshot()
  })

  it('renders with Link', () => {
    const href = 'test-href'
    const { getByTestId } = renderTag('foobar', {
      as: Link,
      href,
    })

    expect(getByTestId('tag')).toHaveAttribute('href', href)
  })
})
