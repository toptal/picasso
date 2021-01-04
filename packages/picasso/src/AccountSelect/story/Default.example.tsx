import React from 'react'
import { AccountSelect } from '@toptal/picasso'

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

const Example = () => (
  <div>
    <AccountSelect
      accounts={accounts}
      onSelect={account => console.log(account)}
    />
  </div>
)

export default Example
