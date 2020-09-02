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

  test('adds rel="noopener" to target="_blank" links in its absence', () => {
    render(
      <Link href='http://example.com' target='_blank'>
        External Link
      </Link>
    )

    expect(document.querySelector('a')).toHaveAttribute('rel', 'noopener')
  })

  test('does not add rel="noopener" to target="_blank" if noreferrer is present', () => {
    render(
      <Link href='http://example.com' target='_blank' rel='noreferrer'>
        External Link
      </Link>
    )

    expect(document.querySelector('a')).not.toHaveAttribute('rel', 'noopener')
  })
})
