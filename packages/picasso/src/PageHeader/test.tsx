import React from 'react'
import { render } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Link from '../Link'
import PageHeader from './PageHeader'

describe('Page.Header', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <PageHeader title='Default' />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('render with link', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <PageHeader
          title='Something'
          logoLink={<Link href='https://www.toptal.com' />}
        />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
