import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import ContentLoader from 'react-content-loader'
import { palette } from '@toptal/picasso/utils'

export interface Props extends BaseProps {
  /** Centers loader horizontally */
  centered?: boolean
}

export const HeaderLoader = ({ centered }: Props) => (
  <ContentLoader viewBox='0 0 400 10' color={palette.grey.main}>
    <rect x={centered ? 150 : 0} y='0' rx='1.5' ry='1.5' width='100' height='3' />
  </ContentLoader>
)

HeaderLoader.displayName = 'HeaderLoader'

export default HeaderLoader
