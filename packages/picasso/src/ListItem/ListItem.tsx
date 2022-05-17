import React, { ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Container from '../Container'
import Typography from '../Typography'
import { Bullet16 } from '../Icon'
import styles from './styles'

export type Props = BaseProps & {
  children: ReactNode
  variant?: 'ordered' | 'unordered'
  index?: number
  /** Add a custom `<Icon />` to set a custom bullet in ordered lists */
  icon?: ReactNode
  isLastElement?: boolean
}

const Index = ({ children }: { children: ReactNode }) => (
  <Typography size='medium'>{children}.</Typography>
)

const getBulletOrNumber = (
  variant: 'ordered' | 'unordered',
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
  const {
    children,
    icon,
    variant = 'unordered',
    index = 1,
    isLastElement,
    ...rest
  } = props

  const itemIcon = getBulletOrNumber(variant, index, icon)

  return (
    <li {...rest}>
      <Container
        flex
        direction='row'
        className={cx(classes.listContainer, {
          [classes.lastElement]: isLastElement
        })}
      >
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
