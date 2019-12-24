import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter, Link as RouterLink } from 'react-router-dom'
import Picasso from '@toptal/picasso-shared'

import Link from '../Link'

describe('Link', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Link>Please verify your email</Link>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('renders native attributes', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <Link
          onBlur={() => window.alert('onBlur')}
          rel='noopener'
          target='_blank'
          download='filename'
          href='https://toptal.com/filename.txt'
        >
          Please verify your email
        </Link>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  test('renders a Link from react-router', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <MemoryRouter>
          <div>
            <Link as={RouterLink} to='/'>
              Please verify your email
            </Link>
          </div>
        </MemoryRouter>
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
