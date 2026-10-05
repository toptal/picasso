import type { ReactNode } from 'react'
import React from 'react'
import type { HelmetProps } from '@toptal/picasso-provider'
import { Helmet } from '@toptal/picasso-provider'

export interface Props extends HelmetProps {
  /** content that goes to the document head */
  children?: ReactNode
}

export const PageHelmet = (props: Props): React.ReactElement => {
  const { children, ...rest } = props

  return <Helmet {...rest}>{children}</Helmet>
}

PageHelmet.displayName = 'PageHelmet'

export default PageHelmet
