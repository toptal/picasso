import React, { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Container, Typography } from '@toptal/picasso'
import { Bullet16 } from '@toptal/picasso/Icon'
import { Theme, makeStyles } from '@material-ui/core/styles'

import { ListVariant } from '../List/List'
import styles from './styles'

export type Props = BaseProps & {
  children: ReactNode
  variant?: ListVariant
  index?: number
  /** Add a custom `<Icon />` to set a custom bullet in ordered lists */
  icon?: ReactNode
}

const Index = ({ children }: { children: ReactNode }) => (
  <Typography size='medium' align='center'>
    {children}.
  </Typography>
)

const getBulletOrNumber = (
  variant: ListVariant,
  index: number,
  icon?: ReactNode
): ReactNode => {
  if (icon) {
    return icon
  }

  if (variant === 'unordered') {
    return <Bullet16 />
  }

  return <Index>{index + 1}</Index>
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoListItem' })

export const ListItem = (props: Props) => {
  const classes = useStyles()
  const { children, icon, variant, index, ...rest } = props

  const itemIcon = getBulletOrNumber(variant!, index!, icon)

  return (
    <li {...rest}>
      <Container flex direction='row'>
        <Container
          inline
          right='small'
          justifyContent='flex-end'
          className={classes.iconContainer}
        >
          {itemIcon}
        </Container>
        <Typography size='medium'>{children}</Typography>
      </Container>
    </li>
  )
}

ListItem.defaultProps = {}

ListItem.displayName = 'ListItem'

export default ListItem
