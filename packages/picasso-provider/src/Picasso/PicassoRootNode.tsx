import React, { forwardRef, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import globalStyles from './styles'

export interface PicassoRootNodeProps {
  children?: ReactNode
}

const useGlobalStyles = makeStyles<Theme>(globalStyles, {
  name: 'Picasso',
})

const PicassoRootNode = forwardRef<HTMLDivElement, PicassoRootNodeProps>(
  (props, ref) => {
    const { children } = props
    const classes = useGlobalStyles()

    return (
      <div ref={ref} className={classes.root}>
        {children}
      </div>
    )
  }
)

PicassoRootNode.displayName = 'PicassoRootNode'

export default PicassoRootNode
