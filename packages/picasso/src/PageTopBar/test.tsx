import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Link from '../Link'
import PageTopBar from './PageTopBar'

describe('Page.TopBar', () => {
  it('renders', () => {
    const { container } = render(<PageTopBar title='Default' />)

    expect(container).toMatchSnapshot()
  })

  it('render with link', () => {
    const { container } = render(
      <PageTopBar
        title='Something'
        logoLink={<Link href='https://www.toptal.com' />}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
