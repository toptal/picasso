import React from 'react'
import type { RadioProps } from '@toptal/picasso-radio'
import { Radio as PicassoRadio } from '@toptal/picasso-radio'

import { RadioChecked } from './RadioChecked'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = ({ name, ...rest }: Props): React.ReactElement => (
  <RadioChecked name={name} value={rest.value}>
    {checked => <PicassoRadio checked={checked} {...rest} />}
  </RadioChecked>
)

export default Radio
