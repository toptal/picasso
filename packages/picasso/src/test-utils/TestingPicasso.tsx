import React from 'react'
import Picasso from '@toptal/picasso-provider'
import { TextLabelProps } from '@toptal/picasso-shared'

export const TestingPicasso = ({
  children,
  titleCase
}: Partial<TextLabelProps>) => {
  return (
    <Picasso
      loadFavicon={false}
      loadFonts={false}
      fixViewport={false}
      titleCase={titleCase}
      disableTransitions
    >
      {children}
    </Picasso>
  )
}

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
