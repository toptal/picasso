import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Link from '../Link'
import PageHeader from './PageHeader'

describe('Page.Header', () => {
  test('default render', () => {
    const { container } = render(<PageHeader title='Default' />)

    expect(container).toMatchSnapshot()
  })

  test('render with link', () => {
    const { container } = render(
      <PageHeader
        title='Something'
        logoLink={<Link href='https://www.toptal.com' />}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
