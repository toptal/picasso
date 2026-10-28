import React from 'react'
import { render, screen } from '@toptal/picasso-test-utils'
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

  describe('when the hamburger is shown', () => {
    const renderHamburger = (variant: 'dark' | 'light') => {
      setScreenWidth(1200)

      render(
        <PageTopBar
          variant={variant}
          centerContent={<div>Menu</div>}
          testIds={{ hamburger: 'hamburger' }}
        />
      )

      return screen.getByTestId('hamburger')
    }

    describe('when the variant is dark', () => {
      it('renders a light hamburger button', () => {
        expect(renderHamburger('dark')).toHaveClass('text-white')
      })
    })

    describe('when the variant is light', () => {
      it('renders a dark hamburger button', () => {
        const hamburger = renderHamburger('light')

        expect(hamburger).toHaveClass('text-graphite-700')
        expect(hamburger).not.toHaveClass('text-white')
      })
    })
  })
})
