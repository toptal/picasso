import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './EnvironmentBanner'
import { EnvironmentBanner } from './EnvironmentBanner'

const renderEnvironmentBanner = (props: OmitInternalProps<Props>) => {
  const { environment, productName } = props

  return render(
    <EnvironmentBanner environment={environment} productName={productName} />
  )
}

describe('EnvironmentBanner', () => {
  it('development render', () => {
    const { container } = renderEnvironmentBanner({
      environment: 'development',
      productName: 'Picasso',
    })

    expect(container).toMatchSnapshot()
  })
})
