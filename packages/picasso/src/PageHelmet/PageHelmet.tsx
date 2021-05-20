import React, { ReactNode } from 'react'
import { Helmet, HelmetProps } from 'react-helmet'

export interface Props extends HelmetProps {
  /** content that goes to the document head */
  children?: ReactNode
}

export const PageHelmet = (props: Props) => {
  const { children, ...rest } = props

  return <Helmet {...rest}>{children}</Helmet>
}

PageHelmet.displayName = 'PageHelmet'

export default PageHelmet
