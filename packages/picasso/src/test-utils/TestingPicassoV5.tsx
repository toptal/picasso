import React from 'react'
import { PicassoV5 } from '@toptal/picasso-provider'
import { TextLabelProps } from '@toptal/picasso-shared'

export type Props = TextLabelProps & {
  children: React.ReactNode
}

export const TestingPicassoV5 = ({ children, titleCase }: Props) => (
  <PicassoV5
    loadFavicon={false}
    loadFonts={false}
    fixViewport={false}
    titleCase={titleCase}
    disableTransitions
  >
    {children}
  </PicassoV5>
)

TestingPicassoV5.displayName = 'TestingPicassoV5'

export default TestingPicassoV5
