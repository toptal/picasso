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
import type { ListItemType } from '../List/context'
import { useListContext } from '../List/context'
import { ArrowLongRight16, Check16 } from '../Icon'

export type Props = BaseProps & {
  children: ReactNode
  variant?: 'ordered' | 'unordered'
  index?: number
  /**
   * @deprecated [FX-4717] if you need a custom icon that is not available on the prop `type`, please contact the BASE team to add it to the theme
   **/
  icon?: ReactNode
  /** Style of the bullet/ordinal */
  type?: ListItemType
  isLastElement?: boolean
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoListItem' })

const resolveIcon = (type: ListItemType | undefined) => {
  switch (type) {
    case 'checkmark':
      return <Check16 />
    case 'arrow':
      return <ArrowLongRight16 />
    default:
      return undefined
  }
}

export const ListItem = (props: Props) => {
  const classes = useStyles()
  const { styleType: parentType } = useListContext()
  const {
    children,
    variant = 'unordered',
    type,
    icon = resolveIcon(type ?? parentType),
    'data-testid': testId,
  } = props

  // TODO: [FX-4717]
  usePropDeprecationWarning({
    props,
    componentName: ListItem.name,
    name: 'icon',
  })

  return (
    <li
      className={cx(classes.root, classes[variant], {
        [classes.hasIcon]: icon != null,
        [classes[type ?? '']]: type != null,
      })}
      data-testid={testId}
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

ListItem.displayName = 'ListItem'

export default ListItem
