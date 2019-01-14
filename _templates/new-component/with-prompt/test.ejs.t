---
to: components/<%= h.changeCase.pascalCase(name) %>/test.jsx
---
import React from 'react'
import <%= h.changeCase.pascalCase(name) %> from './index'
import { render, fireEvent, cleanup } from 'react-testing-library'

const render<%= h.changeCase.pascalCase(name) %> = (children, props = {}) => {
  return render(<<%= h.changeCase.pascalCase(name) %> {...props}>{children}</<%= h.changeCase.pascalCase(name) %>>)
}

afterEach(cleanup)

describe('', () => {
  beforeEach(() => {
    api = render<%= h.changeCase.pascalCase(name) %>()
  })
  test('', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
