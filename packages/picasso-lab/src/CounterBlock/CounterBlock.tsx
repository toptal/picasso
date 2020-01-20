import React, {
  forwardRef,
  ElementType,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent
} from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  CompoundedComponentWithRef,
  OverridableComponent,
  ColorType,
  BaseProps
} from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso'

import styles from './styles'
import CounterBlockGroup from '../CounterBlockGroup'

export type Props = BaseProps &
  HTMLAttributes<HTMLButtonElement> & {
    /** Counter value  */
    value: string
    /** Counter title  */
    label: string
    /** The color of counter's title  */
    color?: ColorType
    /** Component used for the root node. Either a string to use a DOM element or a component. */
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

interface StaticProps {
  Group: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoCounterBlock'
})

export const CounterBlock: OverridableComponent<Props> & StaticProps =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, Props>(function CounterBlock(props, ref) {
    const {
      value,
      label,
      color,
      as: Component = 'button',
      className,
      onClick,
      ...rest
    } = props
    const classes = useStyles(props)

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className, {
          [classes.clickable]: Boolean(onClick)
        })}
        onClick={onClick}
      >
        <Typography size='large' weight='semibold'>
          {value}
        </Typography>
        <Typography
          size='small'
          weight='semibold'
          className={classes.title}
          color={color}
        >
          {label}
        </Typography>
      </Component>
    )
  }) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

CounterBlock.defaultProps = {
  as: 'button'
}

CounterBlock.Group = CounterBlockGroup
CounterBlock.displayName = 'CounterBlock'

export default CounterBlock
