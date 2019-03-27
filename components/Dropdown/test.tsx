import React, { ReactNode } from 'react'
import { render, cleanup, RenderResult, fireEvent } from 'react-testing-library'

import Picasso from '../Picasso'
import Dropdown from './Dropdown'

const renderDropdown = (children: React.ReactNode, props: any) => {
  return render(
    <Picasso loadFonts={false}>
      <Dropdown {...props} disablePortal>
        {children}
      </Dropdown>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Dropdown', () => {
  let api: RenderResult
  let Items: any

  beforeEach(() => {
    Items = () => (
      <React.Fragment>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </React.Fragment>
    )
  })

  test('default render', () => {
    api = renderDropdown('Open Dropdown', { content: <Items /> })
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('render as open', () => {
    api = renderDropdown('Open Dropdown', { content: <Items />, open: true })
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('opens dropdown on trigger click', () => {
    api = renderDropdown('Open Dropdown', { content: <Items /> })
    const { container, getByText } = api
    const triggerElement = getByText('Open Dropdown')

    fireEvent.click(triggerElement)
    expect(container).toMatchSnapshot()
  })
})
