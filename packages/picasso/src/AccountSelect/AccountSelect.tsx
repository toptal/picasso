import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

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

export interface Props
  extends StandardProps,
    Omit<ListNativeProps, 'onSelect'> {
  /** List of available accounts */
  accounts: Account[]
  /** Callback invoked when specific role record is clicked in the list */
  onSelect: (account: Account) => void
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoAccountSelect'
})

export const AccountSelect = forwardRef<HTMLUListElement, Props>(
  function AccountSelect(props, ref) {
    const {
      className,
      accounts,
      onSelect,
      style,
      classes: externalClasses,
      ...rest
    } = props
    const classes = mergeClasses(useStyles(props), externalClasses)

    const {
      accountItem: accountItemClass,
      accountLink: accountLinkClass,
      ...menuClasses
    } = classes

    return (
      <Menu
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        classes={menuClasses}
        className={className}
        style={style}
      >
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
