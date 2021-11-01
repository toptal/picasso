import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { Avatar } from '../..'

describe('Avatar.Group', () => {
  it('renders', () => {
    const { container } = render(
      <Avatar.Group items={[...Array(6)].map(() => ({}))} data-testid='foo' />
    )

    expect(container).toMatchSnapshot()
  })

  it('renders Avatars within limit', () => {
    const { getAllByTestId } = render(
      <Avatar.Group
        limit={5}
        items={[...Array(3)].map(() => ({ 'data-testid': 'bar' }))}
      />
    )

    expect(getAllByTestId('bar')).toHaveLength(3)
  })

  it('renders limited number of Avatars', () => {
    const { getAllByTestId } = render(
      <Avatar.Group
        limit={6}
        items={[...Array(8)].map(() => ({ 'data-testid': 'bar' }))}
      />
    )

    expect(getAllByTestId('bar')).toHaveLength(6)
  })
})
