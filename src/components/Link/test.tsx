import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Link from '../Link'
import Picasso from '../Picasso'

const renderLink = () => {
  return render(
    <Picasso loadFonts={false}>
      <Link>Please verify your email</Link>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Link', () => {
  test('default render', () => {
    const { container } = renderLink()

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
})
