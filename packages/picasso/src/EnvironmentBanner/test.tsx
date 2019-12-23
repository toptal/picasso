import React from 'react'
/* eslint-disable-next-line */
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import EnvironmentBanner, { Props } from './EnvironmentBanner'

const renderEnvironmentBanner = (props: OmitInternalProps<Props>) => {
  const { environment, productName } = props

  return render(
    <Picasso loadFonts={false}>
      <EnvironmentBanner environment={environment} productName={productName} />
    </Picasso>
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
