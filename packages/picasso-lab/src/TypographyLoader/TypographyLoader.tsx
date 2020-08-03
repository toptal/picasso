import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

export interface Props extends BaseProps {
  /** Specify the amount of rows */
  rows?: number
}

const Paragraph = () => (
  <ContentLoader viewBox='0 0 400 10' color={palette.grey.main}>
    <rect x='0' y='0' rx='1.5' ry='1.5' width='400' height='3' />
  </ContentLoader>
)

export const TypographyLoader = ({ rows = 1 }: Props) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <Paragraph key={index} />
      ))}
    </>
  )
}

TypographyLoader.displayName = 'TypographyLoader'

export default TypographyLoader
