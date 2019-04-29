import React from 'react'
import { render, cleanup, RenderResult, fireEvent } from 'react-testing-library'

import Picasso from '../Picasso'
import AccountSelect from './index'

const renderAccountSelect = (children: React.ReactNode, props: any) => {
  return render(
    <Picasso loadFonts={false}>
      <AccountSelect {...props}>{children}</AccountSelect>
    </Picasso>
  )
}

afterEach(cleanup)

const accounts = [
  {
    id: '1',
    name: 'Phil Leif',
    position: 'Account Owner at Stowaway Cosmetics'
  },
  {
    id: '2',
    href: '#',
    name: 'Phil Leif',
    position: 'Company Representative at Marketing Works'
  },
  {
    id: '3',
    href: '#',
    name: 'Phil Leif',
    position: 'Talent',
    avatar: './jacqueline-with-flowers-1954-square.jpg'
  }
]

describe('AccountSelect', () => {
  let onSelect: () => void
  let api: RenderResult

  beforeEach(() => {
    onSelect = jest.fn()
    api = renderAccountSelect(null, {
      onSelect,
      accounts
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test("should fire onSelect event after clicking on account's name", () => {
    const { getByText } = api
    const row = getByText(accounts[0].name)

    fireEvent.click(row)
    expect(onSelect).toHaveBeenCalledWith(accounts[0])
  })
})
