import React from 'react'
import Picasso from '@toptal/picasso-provider'
import type { TextLabelProps } from '@toptal/picasso-shared'

export type Props = TextLabelProps & {
  children: React.ReactNode
}

export const TestingPicasso = ({ children, titleCase }: Props) => {
  return (
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      titleCase={titleCase}
      fixScrollbarJump={false}
      disableTransitions
    >
      {children}
    </Picasso>
  )
}

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
