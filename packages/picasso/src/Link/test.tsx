import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { MemoryRouter, Link as RouterLink } from 'react-router-dom'

import Link from '../Link'

describe('Link', () => {
  test('default render', () => {
    const { container } = render(<Link>Please verify your email</Link>)

    expect(container).toMatchSnapshot()
  })

  test('renders native attributes', () => {
    const { container } = render(
      <Link
        onBlur={() => window.alert('onBlur')}
        rel='noopener'
        target='_blank'
        download='filename'
        href='https://toptal.com/filename.txt'
      >
        Please verify your email
      </Link>
    )

    expect(container).toMatchSnapshot()
  })

  test('renders a Link from react-router', () => {
    const { container } = render(
      <MemoryRouter>
        <div>
          <Link as={RouterLink} to='/'>
            Please verify your email
          </Link>
        </div>
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })
})
