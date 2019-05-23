import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso from '../Picasso'
import Link from '../Link'
import PageHeader from './PageHeader'

afterEach(cleanup)

describe('Page.Header', () => {
  test('default render', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <PageHeader title='Default' />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })

  // this test passes when run as part of `yarn test` but fails when run with `yarn storybook`

  test('render with link', () => {
    const { container } = render(
      <Picasso loadFonts={false}>
        <PageHeader
          title='Something'
          logoLink={<Link href='https://www.toptal.com' />}
        />
      </Picasso>
    )

    expect(container).toMatchSnapshot()
  })
})
