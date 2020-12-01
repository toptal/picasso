import React, {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  forwardRef
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, withClasses } from '@toptal/picasso-shared'

import Button from '../Button'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

export type ButtonGroupOrder = 'first' | 'middle' | 'last' | undefined

const getButtonGroupOrder = (
  index: number,
  length: number
): ButtonGroupOrder => {
  if (length <= 1) {
    return undefined
  }

  if (index === 0) {
    return 'first'
  }

  if (index < length - 1) {
    return 'middle'
  }

  return 'last'
}

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup({ children, classes, className, style, ...rest }, ref) {
    const childrenLength = React.Children.toArray(children).length

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as ReactElement, {
            'data-button-group': getButtonGroupOrder(index, childrenLength)
          })
        )}
      </div>
    )
  }
)

ButtonGroup.defaultProps = {
  classes: {}
}

ButtonGroup.displayName = 'ButtonGroup'

export default withStyles(styles)(
  withClasses(classes => [
    [
      Button,
      {
        root: classes.button,
        active: classes.active,
        focused: classes.focused,
        hovered: classes.hovered
      }
    ]
  ])(ButtonGroup)
)
