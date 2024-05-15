import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'
import { UserBadge } from '@toptal/picasso-user-badge'
import { Typography } from '@toptal/picasso-typography'
import { Link } from '@toptal/picasso-link'
import { Container } from '@toptal/picasso-container'
import { ChevronRight16 } from '@toptal/picasso-icons'
import { Menu, MenuItem } from '@toptal/picasso-menu'

type Account = {
  /** User's id */
  id: string
  /** URL of the page the user's item link goes to */
  href?: string
  /** Full name of the user that is displayed next to the avatar */
  name: string
  /** Position of the user at the listed company */
  position: string
  /** Link to user's photo */
  avatar?: string
}

export interface Props
  extends BaseProps,
    Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /** List of available accounts */
  accounts: Account[]
  /** Callback invoked when specific role record is clicked in the list */
  onSelect: (account: Account) => void
}

export const AccountSelect = forwardRef<HTMLUListElement, Props>(
  function AccountSelect(props, ref) {
    const { className, accounts, onSelect, style, ...rest } = props

    return (
      <Menu
        {...rest}
        ref={ref}
        className={twMerge('p-0', className)}
        style={style}
      >
        {accounts.map(account => (
          <MenuItem
            disableGutters
            // TODO replace border-[0] with border-0 after rebase
            className='h-auto [&+&]:border-t border-[0] border-solid border-gray-400'
            key={`role-${account.id}`}
          >
            <Link
              className='flex-1'
              href={account.href}
              onClick={() => onSelect(account)}
              noUnderline
            >
              <Container
                padded='medium'
                flex
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <UserBadge name={account.name} avatar={account.avatar}>
                  <Typography size='xsmall'>{account.position}</Typography>
                </UserBadge>
                <ChevronRight16 color='dark-grey' />
              </Container>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    )
  }
)

AccountSelect.defaultProps = {
  onSelect: () => {},
}

AccountSelect.displayName = 'AccountSelect'

export default AccountSelect
