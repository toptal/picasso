import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup } from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import Indicator, { Props } from './Indicator'

const renderIndicator = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { color } = props

  return render(
    <Picasso loadFonts={false}>
      <Indicator color={color}>{children}</Indicator>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Indicator', () => {
  test('default render', () => {
    const { container } = renderIndicator(null, { color: 'red' })

    expect(container).toMatchSnapshot()
  })
})
