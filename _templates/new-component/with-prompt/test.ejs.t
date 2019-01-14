---
to: components/<%= h.changeCase.pascalCase(name) %>/test.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
import <%= Name %> from './index'
/* eslint-disable no-unused-vars */
import { render, fireEvent, cleanup } from 'react-testing-library'

const render<%= Name %> = (children, props = {}) => {
  return render(<<%= Name %> {...props}>{children}</<%= Name %>>)
}

afterEach(cleanup)

describe('', () => {
  let api

  beforeEach(() => {
    api = render<%= Name %>()
  })
  test('', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
