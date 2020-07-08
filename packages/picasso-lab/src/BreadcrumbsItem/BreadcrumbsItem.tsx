import React, {
  forwardRef,
  ElementType,
  HTMLAttributes,
  FunctionComponent
} from 'react'
import {
  BaseProps,
  OverridableComponent,
  useAppConfig
} from '@toptal/picasso-shared'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { Typography } from '@toptal/picasso'
import cx from 'classnames'
import { toTitleCase } from '@toptal/picasso/utils'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLElement> {
  /** Component name to render the breadcrumbs item as */
  as?: ElementType
  /** Whether the item is active */
  active: boolean
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
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
  const { as, active, children, className, titleCase, ...rest } = props
  const Component = active ? Active : as || 'span'
  const classes = useStyles(props)

  const { titleCase: defaultTitleCase } = useAppConfig()
  const titleCaseIsApplied = titleCase ?? defaultTitleCase

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component ref={ref} className={cx(classes.root, className)} {...rest}>
      {titleCaseIsApplied ? toTitleCase(children) : children}
    </Component>
  )
})

BreadcrumbsItem.defaultProps = {
  as: 'span'
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem'

export default BreadcrumbsItem
