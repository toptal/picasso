import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  ReactNode
} from 'react'
import {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
  useTitleCase
} from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Typography from '../Typography'
import { toTitleCase } from '../utils'
import styles from './styles'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLElement> {
  /** Component name to render the breadcrumbs item as */
  as?: ElementType
  /** Whether the item is active */
  active: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoBreadcrumbs'
})

const Active = (props: { children: ReactNode }) => {
  return <Typography weight='semibold' color='black' {...props} />
}

export const BreadcrumbsItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function BreadcrumbsItem(props, ref) {
  const {
    as,
    active,
    children,
    className,
    titleCase: propsTitleCase,
    ...rest
  } = props
  const Component = active ? Active : as || 'span'
  const classes = useStyles()

  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Component ref={ref} className={cx(classes.root, className)} {...rest}>
      {titleCase ? toTitleCase(children) : children}
    </Component>
  )
})

BreadcrumbsItem.defaultProps = {
  as: 'span'
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem'

export default BreadcrumbsItem
