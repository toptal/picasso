import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Container from '../Container'
import Typography from '../Typography'
import styles from './styles'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'

export type Props = BaseProps & {
  children: ReactNode
  variant?: 'ordered' | 'unordered'
  index?: number
  /** @deprecated */
  icon?: ReactNode
  type?: 'circle' | 'disc' | 'checkmark' | 'numeral'
  isLastElement?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoListItem' })

export const ListItem = (props: Props) => {
  const classes = useStyles()
  const { children, icon, variant = 'unordered', ...rest } = props

  usePropDeprecationWarning({
    props,
    componentName: ListItem.name,
    name: 'icon',
  })

  return (
    <li
      className={cx(classes.root, classes[variant], {
        [classes.hasIcon]: icon != null,
      })}
      {...rest}
    >
      <Container flex direction='row' className={cx(classes.listContainer)}>
        {icon && (
          <Container inline justifyContent='flex-end'>
            {icon}
          </Container>
        )}
        <Typography as='div' size='medium' className={classes.content}>
          {children}
        </Typography>
      </Container>
    </li>
  )
}

ListItem.defaultProps = {}

ListItem.displayName = 'ListItem'

export default ListItem
