import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test_utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import EnvironmentBanner, { Props } from './EnvironmentBanner'

const renderEnvironmentBanner = (props: OmitInternalProps<Props>) => {
  const { environment, productName } = props

  return render(
    <EnvironmentBanner environment={environment} productName={productName} />
  )
}

describe('EnvironmentBanner', () => {
  test('development render', () => {
    const { container } = renderEnvironmentBanner({
      environment: 'development',
      productName: 'Picasso'
    })

    expect(container).toMatchSnapshot()
  })

  test('production render', () => {
    const { container } = renderEnvironmentBanner({
      environment: 'production',
      productName: 'Picasso'
    })

    expect(container).toMatchSnapshot()
  })
})
