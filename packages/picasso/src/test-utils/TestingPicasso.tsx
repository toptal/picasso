import React, { FunctionComponent } from 'react'
import Picasso, { TextLabelProps } from '@toptal/picasso-shared'

export const TestingPicasso: FunctionComponent<Partial<TextLabelProps>> = ({
  children,
  titleCase
}) => (
  <Picasso
    loadFavicon={false}
    loadFonts={false}
    fixViewport={false}
    titleCase={titleCase}
  >
    {children}
  </Picasso>
)

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
