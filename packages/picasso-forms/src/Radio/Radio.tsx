import React from 'react'
import { Radio as PicassoRadio, RadioProps } from '@toptal/picasso'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = (props: Props) => (
  <PicassoRadio
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

export default Radio
