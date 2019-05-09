import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Typography from '../Typography'
import UserBadge from './index'
import Picasso from '../index'

const renderUserBadge = (children: React.ReactNode, props: any) => {
  const { size, center, invert } = props

  return render(
    <Picasso loadFonts={false}>
      <UserBadge name='Joe Doe' size={size} center={center} invert={invert}>
        {children}
      </UserBadge>
    </Picasso>
  )
}

afterEach(cleanup)

describe('UserBadge', () => {
  test('default render', () => {
    const { container } = renderUserBadge(
      <Typography>QA tester</Typography>,
      null
    )

    expect(container).toMatchSnapshot()
  })

  test('small size', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      size: 'small'
    })

    expect(container).toMatchSnapshot()
  })

  test('manual center alignment', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      center: true
    })

    expect(container).toMatchSnapshot()
  })

  test('auto center alignment', () => {
    const { container } = renderUserBadge(null, null)

    expect(container).toMatchSnapshot()
  })

  test('override auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      center: false
    })

    expect(container).toMatchSnapshot()
  })

  test('invert render', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      invert: true
    })

    expect(container).toMatchSnapshot()
  })
})
