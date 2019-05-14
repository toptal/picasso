import React, { ReactNode } from 'react'
import { render, cleanup } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import Loader, { Props } from './Loader'

const renderLoader = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { inline, size } = props

  return render(
    <Loader inline={inline} size={size}>
      {children}
    </Loader>
  )
}

afterEach(cleanup)

test('props combo', () => {
  const { container } = renderLoader('Testing', {
    inline: true,
    size: 'large'
  })

  expect(container).toMatchSnapshot()
})
