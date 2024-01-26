import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'

import './styles.css'
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
