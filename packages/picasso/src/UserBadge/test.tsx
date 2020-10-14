import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import UserBadge, { Props } from './UserBadge'

const renderUserBadge = (
  children: React.ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { size, center, name, title, invert, renderName, renderTitle } = props

  return render(
    <UserBadge
      name={name}
      title={title}
      size={size}
      center={center}
      invert={invert}
      renderName={renderName}
      renderTitle={renderTitle}
    >
      {children}
    </UserBadge>
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

  test('custom name', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      // eslint-disable-next-line react/display-name
      renderName: name => <div>{name}</div>
    })

    expect(container).toMatchSnapshot()
  })

  test('custom title', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      title: 'Custom Title',
      // eslint-disable-next-line react/display-name
      renderTitle: title => <div>{title}</div>
    })

    expect(container).toMatchSnapshot()
  })
})
