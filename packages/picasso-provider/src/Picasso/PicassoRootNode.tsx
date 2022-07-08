import React, { forwardRef, ReactNode } from 'react'
import { styled } from '@mui/material/styles'

export interface PicassoRootNodeProps {
  children?: ReactNode
}

const Root = styled('div')(({ theme: { typography } }) => ({
  flex: 1,
  boxSizing: 'border-box',

  '& *': {
    fontFamily: typography.fontFamily,
  },

  // https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
  '& *, & *::before, & *::after': {
    boxSizing: 'inherit',
  },
}))

const PicassoRootNode = forwardRef<HTMLDivElement, PicassoRootNodeProps>(
  (props, ref) => {
    const { children } = props

    return <Root ref={ref}>{children}</Root>
  }
)

PicassoRootNode.displayName = 'PicassoRootNode'

export default PicassoRootNode
