import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core'
import { ChevronRight16 } from '@toptal/picasso-icons'
import './styles'

export interface Props extends BaseProps {
  /** Content of Breadcrumbs */
  children: ReactNode
}

export const Breadcrumbs = forwardRef<HTMLElement, Props>(function Breadcrumbs(
  props,
  ref
) {
  return <MuiBreadcrumbs ref={ref} separator={<ChevronRight16 />} {...props} />
})

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
