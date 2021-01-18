import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Link from '../Link'
import TopBar from './TopBar'

describe('Page.TopBar', () => {
  it('default render', () => {
    const { container } = render(<TopBar title='Default' />)

    expect(container).toMatchSnapshot()
  })

  it('render with link', () => {
    const { container } = render(
      <TopBar
        title='Something'
        logoLink={<Link href='https://www.toptal.com' />}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
