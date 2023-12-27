/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import type { HelmetProps } from 'react-helmet-async'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet-async'

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
