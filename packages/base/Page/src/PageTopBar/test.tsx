import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { Link } from '@toptal/picasso-link'

import { PageTopBar } from './PageTopBar'

const setScreenWidth = (width: number) => {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'))
}

describe('PageTopBar', () => {
  const originalInnerWidth = window.innerWidth

  afterEach(() => {
    setScreenWidth(originalInnerWidth)
  })

  it('renders normally on default screen size', () => {
    const { container } = render(<PageTopBar title='Default' />)

    expect(container).toMatchSnapshot()
  })

  it('renders with link', () => {
    const { container } = render(
      <PageTopBar
        title='Something'
        logoLink={<Link href='https://www.toptal.com' />}
      />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with custom logo', () => {
    const logo = <div>Custom logo content</div>
    const { container } = render(<PageTopBar title='Something' logo={logo} />)

    expect(container).toMatchSnapshot()
  })

  it('renders hamburger on small screen', () => {
    setScreenWidth(1200)

    const { container } = render(<PageTopBar title='Default' />)

    expect(container).toMatchSnapshot()
  })
})
