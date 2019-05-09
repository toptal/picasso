import React from 'react'
import { Overwrite } from '@material-ui/core'
import { render, cleanup, RenderResult, fireEvent } from 'react-testing-library'

import Picasso, { JssProps } from '../Picasso'
import AccountSelect, { Props } from './AccountSelect'

const renderAccountSelect = (
  children: React.ReactNode,
  props: Overwrite<Props, Partial<JssProps>>
) => {
  const { onSelect, accounts } = props

  return render(
    <Picasso loadFonts={false}>
      <AccountSelect accounts={accounts} onSelect={onSelect}>
        {children}
      </AccountSelect>
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
