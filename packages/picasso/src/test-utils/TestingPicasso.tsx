import React, { FunctionComponent } from 'react'
import Picasso from '@toptal/picasso-shared'

export const TestingPicasso: FunctionComponent = ({ children }) => (
  <Picasso loadFavicon={false} loadFonts={false} fixViewport={false}>
    {children}
  </Picasso>
)

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
