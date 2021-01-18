import React from 'react'
/* eslint-disable-next-line */
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import EnvironmentBanner, { Props } from './EnvironmentBanner'

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
      productName: 'Picasso'
    })

    expect(container).toMatchSnapshot()
  })

  it('production render', () => {
    const { container } = renderEnvironmentBanner({
      environment: 'production',
      productName: 'Picasso'
    })

    expect(container).toMatchSnapshot()
  })

  it('render nothing in test environment', () => {
    const { container } = renderEnvironmentBanner({
      environment: 'test',
      productName: 'Picasso'
    })

    expect(container).toMatchSnapshot()
  })
})
