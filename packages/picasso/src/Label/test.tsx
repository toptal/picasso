import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps, PicassoDefaultProps } from '@toptal/picasso-shared'
import { titleCase } from 'title-case'

import Label, { Props } from './Label'

jest.mock('title-case')

const renderLabel = (
  children: string,
  props: OmitInternalProps<Props, 'children'>,
  picassoDefaultProps?: PicassoDefaultProps
) => {
  const { onDelete, disabled, variant, titleCase } = props

  return render(
    <Label
      onDelete={onDelete}
      disabled={disabled}
      variant={variant}
      titleCase={titleCase}
    >
      {children}
    </Label>,
    undefined,
    picassoDefaultProps
  )
}

afterEach(() => {
  jest.resetAllMocks()
})

test('renders `grey` variant', () => {
  const { container } = renderLabel('Label', {})

  expect(container).toMatchSnapshot()
})

test('renders `white` variant', () => {
  const { container } = renderLabel('Label', { variant: 'white' })

  expect(container).toMatchSnapshot()
})

test('should transform text to title case when default titleCase property is true', () => {
  renderLabel(
    'some text with-the-edge case for TEST',
    {},
    { Label: { titleCase: true } }
  )

  expect(titleCase).toBeCalledTimes(1)
})

test('should not transform text to title case when default titleCase property is true but the component property overrides it', () => {
  renderLabel(
    'some text with-the-edge case for TEST',
    { titleCase: false },
    { Label: { titleCase: true } }
  )

  expect(titleCase).toBeCalledTimes(0)
})

describe('dismissable label', () => {
  let onDelete: () => void

  beforeEach(() => {
    onDelete = jest.fn()
  })
  test('should render dismissable label', () => {
    const { container } = renderLabel('Label', { onDelete })

    expect(container).toMatchSnapshot()
  })

  test('should fire onDelete event on dismiss action', () => {
    const { getByLabelText } = renderLabel('Label', { onDelete })
    const deleteIcon = getByLabelText('delete icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toHaveBeenCalled()
  })
})
