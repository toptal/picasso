import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, withClasses } from '@toptal/picasso-shared'

import Button from '../Button'
import ButtonGroupContext from './ButtonGroupContext'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children: ReactNode
}

export const ButtonGroup = forwardRef<HTMLDivElement, Props>(
  function ButtonGroup({ children, classes, className, style, ...rest }, ref) {
    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        {React.Children.toArray(children)
          .filter(React.isValidElement)
          .map((child, index) => (
            <ButtonGroupContext.Provider
              key={index}
              value={
                index === 0
                  ? 'first'
                  : index === React.Children.toArray(children).length - 1
                  ? 'last'
                  : undefined
              }
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
