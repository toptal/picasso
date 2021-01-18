import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Loader, { Props } from './Loader'

const renderLoader = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { inline, size } = props

  return render(
    <Loader inline={inline} size={size}>
      {children}
    </Loader>
  )
}

it('props combo', () => {
  const { container } = renderLoader('Testing', {
    inline: true,
    size: 'large'
  })

  expect(container).toMatchSnapshot()
})
