import React, { FunctionComponent } from 'react'
import Picasso, { PicassoDefaultProps } from '@toptal/picasso-shared'

interface TestingPicassoProps {
  defaultProps?: PicassoDefaultProps
}

export const TestingPicasso: FunctionComponent<TestingPicassoProps> = ({
  children,
  defaultProps
}) => (
  <Picasso
    loadFavicon={false}
    loadFonts={false}
    fixViewport={false}
    defaultProps={defaultProps}
  >
    {children}
  </Picasso>
)

TestingPicasso.displayName = 'TestingPicasso'

export default TestingPicasso
