import React from 'react'
import Picasso, { PicassoV5 } from '@toptal/picasso-provider'
import { TextLabelProps } from '@toptal/picasso-shared'

export type Props = TextLabelProps & {
  children: React.ReactNode
  muiV5?: boolean
}

export const TestingPicasso = ({ children, titleCase, muiV5 }: Props) => {
  if (muiV5) {
    return (
      <Picasso
        loadFavicon={false}
        loadFonts={false}
        fixViewport={false}
        titleCase={titleCase}
        disableTransitions
      >
        <PicassoV5
          loadFavicon={false}
          loadFonts={false}
          fixViewport={false}
          titleCase={titleCase}
          disableTransitions
        >
          {children}
        </PicassoV5>
      </Picasso>
    )
  }

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
