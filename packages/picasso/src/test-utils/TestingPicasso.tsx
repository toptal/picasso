import React, { FunctionComponent } from 'react'
import Picasso, { TextCaseTransformationProps } from '@toptal/picasso-shared'

export const TestingPicasso: FunctionComponent<Partial<
  TextCaseTransformationProps
>> = ({ children, titleCase }) => (
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
