import React from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import UserBadge, { Props } from './UserBadge'

const renderUserBadge = (
  children: React.ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { size, center, name, invert } = props

  return render(
    <Picasso loadFonts={false}>
      <UserBadge name={name} size={size} center={center} invert={invert}>
        {children}
      </UserBadge>
    </Picasso>
  )
}

describe('UserBadge', () => {
  test('default render', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  test('small size', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      size: 'small'
    })

    expect(container).toMatchSnapshot()
  })

  test('manual center alignment', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      center: true,
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  test('auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  test('override auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      center: false,
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  test('invert render', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      invert: true
    })

    expect(container).toMatchSnapshot()
  })
})
