import React from 'react'
import { render, fireEvent, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Tag, { Props } from './Tag'

jest.mock('ap-style-title-case')

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoConfig?: PicassoConfig
) => {
  const { onDelete, disabled, variant, titleCase } = props

  return render(
    <Tag
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      titleCase={titleCase}
    >
      {children}
    </Tag>,
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

test('renders `grey` variant', () => {
  const { container } = renderLabel('Tag', {})

  expect(container).toMatchSnapshot()
})

test('renders `blue` variant', () => {
  const { container } = renderLabel('Tag', { variant: 'blue' })

  expect(container).toMatchSnapshot()
})

test('should transform text to title case when Picasso titleCase property is true', () => {
  const TEXT_CONTENT = 'Test bk9'

  renderLabel(TEXT_CONTENT, {}, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledWith(TEXT_CONTENT)
})

test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
  renderLabel('test cl4', { titleCase: false }, { titleCase: true })

  expect(spiedOnTitleCase).toBeCalledTimes(0)
})

describe('dismissable label', () => {
  let onDelete: () => void

  beforeEach(() => {
    onDelete = jest.fn()
  })
  test('should render dismissable label', () => {
    const { container } = renderLabel('Tag', { onDelete })

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByLabelText } = renderLabel('Tag', { onDelete })
    const deleteIcon = getByLabelText('delete icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
