import React from 'react'
import { render, RenderResult, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import AccountSelect, { Props } from './AccountSelect'

const renderAccountSelect = (
  children: React.ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { onSelect, accounts } = props

  return render(
    <AccountSelect accounts={accounts} onSelect={onSelect}>
      {children}
    </AccountSelect>
  )
}

const accounts = [
  {
    id: '1',
    name: 'Phil Leif 1',
    position: 'Account Owner at Stowaway Cosmetics'
  },
  {
    id: '2',
    href: '#',
    name: 'Phil Leif 2',
    position: 'Company Representative at Marketing Works'
  },
  {
    id: '3',
    href: '#',
    name: 'Phil Leif 3',
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
  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it("should fire onSelect event after clicking on account's name", () => {
    const { getByText } = api
    const row = getByText(accounts[0].name)

    fireEvent.click(row)
    expect(onSelect).toHaveBeenCalledWith(accounts[0])
  })
})
