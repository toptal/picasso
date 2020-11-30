import React, { forwardRef } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Loader, Container, LoaderProps } from '@toptal/picasso'

import styles from './styles'

type OverlayPosition = 'top' | 'center'

export interface Props extends Omit<LoaderProps, 'inline'> {
  /** Position of the loader on the overlay */
  position?: OverlayPosition
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoOverlayLoader'
})

export const OverlayLoader = forwardRef<HTMLDivElement, Props>(
  function OverlayLoader(props, ref) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, position, ...loaderProps } = props
    const classes = useStyles(props)

    return (
      <Container
        flex
        padded='small'
        ref={ref}
        className={cx(classes.root, className)}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Loader {...loaderProps} />
      </Container>
    )
  }
)

OverlayLoader.defaultProps = {
  size: 'medium',
  position: 'center'
}

OverlayLoader.displayName = 'OverlayLoader'

export default OverlayLoader
