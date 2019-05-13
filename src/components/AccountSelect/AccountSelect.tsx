import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import palette from '../Picasso/config/palette'
import UserBadge from '../UserBadge'
import Typography from '../Typography'
import Menu from '../Menu'
import Link from '../Link'
import Container from '../Container'
import { ChevronRight } from '../Icon'
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

type Accounts = Account[]

export interface Props extends StandardProps {
  /** List of available accounts */
  accounts: Accounts
  /** Callback invoked when specific role record is clicked in the list */
  onSelect: (account: Account) => void
}

export const AccountSelect: FunctionComponent<Props> = ({
  classes,
  className,
  accounts,
  onSelect,
  style
}) => (
  <Menu className={className} style={style}>
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
          underline='none'
        >
          <Container padded='medium' flex direction='row' alignItems='center'>
            <UserBadge name={account.name} avatar={account.avatar}>
              <Typography variant='caption'>{account.position}</Typography>
            </UserBadge>
            <ChevronRight color={palette.text.primary} />
          </Container>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
)

AccountSelect.defaultProps = {
  onSelect: () => {}
}

AccountSelect.displayName = 'AccountSelect'

export default withStyles(styles)(AccountSelect)
