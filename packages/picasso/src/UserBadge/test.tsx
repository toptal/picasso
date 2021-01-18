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
  it('renders', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  it('small size', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      size: 'small'
    })

    expect(container).toMatchSnapshot()
  })

  it('manual center alignment', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      center: true,
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  it('auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  it('override auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      center: false,
      name: 'Joe Doe'
    })

    expect(container).toMatchSnapshot()
  })

  it('invert render', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      invert: true
    })

    expect(container).toMatchSnapshot()
  })

  it('custom name', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      renderName: name => <div>{name}</div>
    })

    expect(container).toMatchSnapshot()
  })

  it('custom title', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      title: 'Custom Title',
      renderTitle: title => <div>{title}</div>
    })

    expect(container).toMatchSnapshot()
  })
})
