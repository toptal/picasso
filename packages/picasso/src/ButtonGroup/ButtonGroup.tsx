import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, withClasses } from '@toptal/picasso-shared'

import Button from '../Button'
import ButtonGroupContext, { ButtonGroupOrder } from './ButtonGroupContext'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

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
    const childrenArray = React.Children.toArray(children)

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {childrenArray.filter(React.isValidElement).map((child, index) => (
          <ButtonGroupContext.Provider
            key={index}
            value={getButtonGroupOrder(index, childrenArray.length)}
          >
            {child}
          </ButtonGroupContext.Provider>
        ))}
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
        active: classes.active
      }
    ]
  ])(ButtonGroup)
)
