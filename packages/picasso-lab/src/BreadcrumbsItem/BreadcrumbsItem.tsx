import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  FunctionComponent
} from 'react'
import {
  BaseProps,
  TextLabelProps,
  OverridableComponent,
  useTitleCase
} from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Typography } from '@toptal/picasso'
import cx from 'classnames'
import { toTitleCase } from '@toptal/picasso/utils'

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

const Active: FunctionComponent = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
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
    // eslint-disable-next-line react/jsx-props-no-spreading
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
