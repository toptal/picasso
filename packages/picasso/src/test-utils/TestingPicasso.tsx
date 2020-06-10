import React, { FunctionComponent } from 'react'
import Picasso from '@toptal/picasso-shared'

interface TestingPicassoProps {
  titleCase?: boolean
}

export const TestingPicasso: FunctionComponent<TestingPicassoProps> = ({
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
