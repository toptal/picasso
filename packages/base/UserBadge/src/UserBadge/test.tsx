import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { Typography } from '@toptal/picasso-typography'
import { screen } from '@testing-library/react'

import type { Props } from './UserBadge'
import { UserBadge } from './UserBadge'

const renderUserBadge = (children: React.ReactNode, props: Props) => {
  const {
    size,
    center,
    name,
    title,
    invert,
    renderName,
    renderTitle,
    classes,
    'data-testid': dataTestId,
  } = props

  return render(
    <UserBadge
      name={name}
      title={title}
      size={size}
      center={center}
      invert={invert}
      renderName={renderName}
      renderTitle={renderTitle}
      classes={classes}
      data-testid={dataTestId}
    >
      {children}
    </UserBadge>
  )
}

describe('UserBadge', () => {
  it('renders', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
    })

    expect(container).toMatchSnapshot()
  })

  it('small size', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      size: 'small',
    })

    expect(container).toMatchSnapshot()
  })

  it('manual center alignment', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      center: true,
      name: 'Joe Doe',
    })

    expect(container).toMatchSnapshot()
  })

  it('auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      name: 'Joe Doe',
    })

    expect(container).toMatchSnapshot()
  })

  it('override auto center alignment', () => {
    const { container } = renderUserBadge(null, {
      center: false,
      name: 'Joe Doe',
    })

    expect(container).toMatchSnapshot()
  })

  it('invert render', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      invert: true,
    })

    expect(container).toMatchSnapshot()
  })

  it('custom name', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      renderName: name => <div>{name}</div>,
    })

    expect(container).toMatchSnapshot()
  })

  it('custom title', () => {
    const { container } = renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      title: 'Custom Title',
      renderTitle: title => <div>{title}</div>,
    })

    expect(container).toMatchSnapshot()
  })

  it('passes classes.root to the root element', () => {
    const testId = 'user-badge'
    const rootClass = 'custom-root'

    renderUserBadge(<Typography>QA tester</Typography>, {
      name: 'Joe Doe',
      classes: { root: rootClass },
      'data-testid': testId,
    })

    const root = screen.getByTestId(testId)

    expect(root).toHaveClass(rootClass)
  })
})
