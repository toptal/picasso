import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Tag, { Props } from './Tag'
import { Settings16 } from '..'

jest.mock('ap-style-title-case')

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const { onDelete, disabled, variant, titleCase, connection, icon } = props

  return render(
    <Tag
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      titleCase={titleCase}
      connection={connection}
      icon={icon}
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

  it('renders `secondary` variant', () => {
    const { container } = renderLabel('Tag', {})

    expect(container).toMatchSnapshot()
  })

  it('renders `primary` variant', () => {
    const { container } = renderLabel('Tag', { variant: 'primary' })

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const TEXT_CONTENT = 'Test bk9'

    renderLabel(TEXT_CONTENT, {}, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledWith(TEXT_CONTENT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderLabel('test cl4', { titleCase: false }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('dismissable label', () => {
    let onDelete: () => void

    beforeEach(() => {
      onDelete = jest.fn()
    })
    it('should render dismissable label', () => {
      const { container } = renderLabel('Tag', { onDelete })

      expect(container).toMatchSnapshot()
    })

    it('should fire onDelete event on dismiss action', () => {
      const { getByLabelText } = renderLabel('Tag', { onDelete })
      const deleteIcon = getByLabelText('delete icon')

      fireEvent.click(deleteIcon)
      expect(onDelete).toHaveBeenCalled()
    })
  })

  it('renders with connection', () => {
    const { container } = renderLabel('foobar', { connection: 5 })

    expect(container).toMatchSnapshot()
  })
  it('renders with connection and icon', () => {
    const { container } = renderLabel('foobar', {
      connection: 5,
      icon: <Settings16 color='darkGrey' />
    })

    expect(container).toMatchSnapshot()
  })
})
