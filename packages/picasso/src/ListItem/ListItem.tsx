import React, { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Container from '../Container'
import Typography from '../Typography'
import { Bullet16 } from '../Icon'
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
  <Typography size='medium'>{children}.</Typography>
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
  const { children, icon, variant = 'unordered', index = 1, ...rest } = props

  const itemIcon = getBulletOrNumber(variant, index, icon)

  return (
    <li {...rest}>
      <Container flex direction='row' className={classes.listContainer}>
        <Container
          inline
          right='small'
          justifyContent='flex-end'
          className={classes[variant]}
        >
          {itemIcon}
        </Container>
        <Typography as='div' size='medium'>
          {children}
        </Typography>
      </Container>
    </li>
  )
}

ListItem.defaultProps = {}

ListItem.displayName = 'ListItem'

export default ListItem
