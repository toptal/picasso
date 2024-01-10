import React from 'react'
import Picasso from '@toptal/picasso-provider'
import type { TextLabelProps } from '@toptal/picasso-shared'
import './styles.css'

export type Props = TextLabelProps & {
  children: React.ReactNode
}

export const TestingPicasso = ({ children, titleCase }: Props) => {
  return (
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
      titleCase={titleCase}
      disableTransitions
      //injectFirst
    >
      {children}
    </Picasso>
  )
}

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
