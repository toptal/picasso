---
to: components/<%= h.changeCase.pascalCase(name) %>/test.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import <%= Name %> from './index'

const render<%= Name %> = (children: React.ReactNode, props: any) => {
  return render(<<%= Name %> {...props}>{children}</<%= Name %>>)
}

afterEach(cleanup)

describe('<%= Name %>', () => {
  let api: RenderResult

  beforeEach(() => {
    api = render<%= Name %>()
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
