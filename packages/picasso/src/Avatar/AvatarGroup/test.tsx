import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import { Avatar } from '../..'

describe('Avatar.Group', () => {
  it('renders on limit', () => {
    const { getAllByTestId } = render(
      <Avatar.Group
        limit={5}
        items={Array(5).fill({ 'data-testid': 'avatar-item' })}
      />
    )

    expect(getAllByTestId('avatar-item')).toHaveLength(5)
  })

  it('renders Avatars within limit', () => {
    const { getAllByTestId } = render(
      <Avatar.Group
        limit={5}
        items={Array(3).fill({ 'data-testid': 'avatar-item' })}
      />
    )

    expect(getAllByTestId('avatar-item')).toHaveLength(3)
  })

  it('renders limited number of Avatars', () => {
    const { getAllByTestId, getByTestId } = render(
      <Avatar.Group
        limit={6}
        testIds={{ overLimit: 'over-limit' }}
        items={Array(8).fill({ 'data-testid': 'avatar-item' })}
      />
    )

    expect(getAllByTestId('avatar-item')).toHaveLength(5)
    expect(getByTestId('over-limit')).toHaveTextContent('+3')
  })
})
