import React, { ReactNode } from 'react'
import { Helmet, HelmetProps } from 'react-helmet'

export interface Props extends HelmetProps {
  /** content that goes to the document head */
  children?: ReactNode
}

export const PageHead = (props: Props) => {
  const { children, ...rest } = props

  return <Helmet {...rest}>{children}</Helmet>
}

PageHead.displayName = 'PageHead'

export default PageHead
