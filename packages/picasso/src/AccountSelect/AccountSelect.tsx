import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import UserBadge from '../UserBadge'
import Typography from '../Typography'
import Menu from '../Menu'
import { ListNativeProps } from '../Menu/Menu'
import Link from '../Link'
import Container from '../Container'
import { ChevronRight16 } from '../Icon'
import styles from './styles'

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

export interface Props extends BaseProps, Omit<ListNativeProps, 'onSelect'> {
  /** List of available accounts */
  accounts: Account[]
  /** Callback invoked when specific role record is clicked in the list */
  onSelect: (account: Account) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccountSelect'
})

export const AccountSelect = forwardRef<HTMLUListElement, Props>(
  function AccountSelect(props, ref) {
    const { className, accounts, onSelect, style, ...rest } = props
    const classes = useStyles()

    const {
      accountItem: accountItemClass,
      accountLink: accountLinkClass
    } = classes

    return (
      <Menu {...rest} ref={ref} className={className} style={style}>
        {accounts.map(account => (
          <Menu.Item
            disableGutters
            className={accountItemClass}
            key={`role-${account.id}`}
          >
            <Link
              className={accountLinkClass}
              href={account.href}
              onClick={() => onSelect(account)}
              underline='none'
            >
              <Container
                padded='medium'
                flex
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <UserBadge name={account.name} avatar={account.avatar}>
                  <Typography size='small'>{account.position}</Typography>
                </UserBadge>
                <ChevronRight16 color='dark-grey' />
              </Container>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
)

AccountSelect.defaultProps = {
  onSelect: () => {}
}

AccountSelect.displayName = 'AccountSelect'

export default AccountSelect
