import React from 'react'
import Picasso from '@toptal/picasso-provider'
import type { TextLabelProps } from '@toptal/picasso-shared'

export type Props = TextLabelProps & {
  children: React.ReactNode
  injectFirst?: boolean
}

export const TestingPicasso = ({
  children,
  titleCase,
  injectFirst = false,
}: Props) => {
  return (
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
      titleCase={titleCase}
      disableTransitions
      injectFirst={injectFirst}
    >
      {children}
    </Picasso>
  )
}

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
