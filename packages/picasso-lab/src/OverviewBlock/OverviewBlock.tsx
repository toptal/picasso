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
  BaseProps
} from '@toptal/picasso-shared'

import styles from './styles'
import OverviewBlockGroup from '../OverviewBlockGroup'

export type Props = BaseProps &
  HTMLAttributes<HTMLButtonElement> & {
    as?: ElementType
    /** Callback invoked when component is clicked */
    onClick?: (event: MouseEvent) => void
  }

interface StaticProps {
  Group: FunctionComponent
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOverviewBlock'
})

export const OverviewBlock: OverridableComponent<Props> & StaticProps =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, Props>(function OverviewBlock(props, ref) {
    const { as: Component = 'div', className, onClick, ...rest } = props
    const classes = useStyles(props)

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        onClick={onClick}
      />
    )
  }) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

OverviewBlock.defaultProps = {
  as: 'div'
}

OverviewBlock.Group = OverviewBlockGroup

OverviewBlock.displayName = 'OverviewBlock'

export default OverviewBlock
