import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import UserBadge from '../UserBadge'
import Typography from '../Typography'
import { MenuCompound as Menu } from '../MenuCompound'
import Link from '../Link'
import Container from '../Container'
import { ChevronRight16 } from '../Icon'
import styles from './styles'
import { SPACING_6 } from '../utils'

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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccountSelect',
})

export const AccountSelect = forwardRef<HTMLUListElement, Props>(
  function AccountSelect(props, ref) {
    const { className, accounts, onSelect, style, ...rest } = props
    const classes = useStyles()

    return (
      <Menu
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {accounts.map(account => (
          <Menu.Item
            disableGutters
            className={classes.accountItem}
            key={`role-${account.id}`}
          >
            <Link
              className={classes.accountLink}
              href={account.href}
              onClick={() => onSelect(account)}
              noUnderline
            >
              <Container
                padded={SPACING_6}
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
          </Menu.Item>
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
