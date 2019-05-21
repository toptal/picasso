import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import PageHeader, { Props } from './PageHeader'

const renderHeader = (props: OmitInternalProps<Props>) => {
  const { title, logoHref } = props

  return render(
    <Picasso loadFonts={false}>
      <PageHeader title={title} logoHref={logoHref} />
    </Picasso>
  )
}

afterEach(cleanup)

describe('Page.Header', () => {
  test('default render', () => {
    const { container } = renderHeader({ title: 'Default' })

    expect(container).toMatchSnapshot()
  })

  test('render with link', () => {
    const { container } = renderHeader({
      title: 'Something',
      logoHref: 'http://www.example.com'
    })

    expect(container).toMatchSnapshot()
  })
})
