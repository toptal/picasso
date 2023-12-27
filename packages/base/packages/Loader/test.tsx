import type { ReactNode } from 'react'
import React from 'react'
import { render } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Loader'
import Loader from './Loader'

const renderLoader = (children: ReactNode, props: OmitInternalProps<Props>) => {
  const { inline, size } = props

  return render(
    <Loader inline={inline} size={size}>
      {children}
    </Loader>
  )
}

describe('Loader', () => {
  it('props combo', () => {
    const { container } = renderLoader('Testing', {
      inline: true,
      size: 'large',
    })

    expect(container).toMatchSnapshot()
  })
})
