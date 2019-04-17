import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import palette from '@components/Picasso/config/palette'

import UserBadge from '../UserBadge'
import Typography from '../Typography'
import Paper from '../Paper'
import Link from '../Link'
import { ChevronRight } from '../Icon'
import { Classes } from '../styles/types'
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

interface Props {
  classes: Classes
  /** List of available accounts */
  accounts: Accounts
  /** Callback invoked when specific role record is clicked in the list */
  onSelect: (account: Account) => void
}

export const AccountSelect: FunctionComponent<Props> = ({
  classes,
  accounts,
  onSelect
}) => (
  <Paper>
    {accounts.map(account => (
      <Link
        key={`role-${account.id}`}
        href={account.href}
        onClick={() => onSelect(account)}
        className={classes.accountItem}
        underline='none'
      >
        <UserBadge name={account.name} avatar={account.avatar}>
          <Typography variant='caption'>{account.position}</Typography>
        </UserBadge>
        <ChevronRight color={palette.text.primary} />
      </Link>
    ))}
  </Paper>
)

AccountSelect.defaultProps = {
  onSelect: () => {}
}

AccountSelect.displayName = 'AccountSelect'

export default withStyles(styles)(AccountSelect)
