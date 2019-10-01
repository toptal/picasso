import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup } from '@testing-library/react'

import { OmitInternalProps } from '../Picasso'
import DatePicker, { Props } from './DatePicker'

const renderDatePicker = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { /* add props you need */ } = props

  return render(<DatePicker>{children}</DatePicker>)
}

afterEach(cleanup)

describe('DatePicker', () => {
  test('default render', () => {
    const { container } = renderDatePicker(null, {})

    expect(container).toMatchSnapshot()
  })
})
