import React, { forwardRef, ReactNode } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { ChevronRight16 } from '@toptal/picasso/Icon'
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core'

import Item from '../BreadcrumbsItem'
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

export default Object.assign(Breadcrumbs, {
  Item
})
