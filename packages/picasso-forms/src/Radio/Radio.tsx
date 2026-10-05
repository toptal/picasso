import React from 'react'
import type { RadioProps } from '@toptal/picasso-radio'
import { Radio as PicassoRadio } from '@toptal/picasso-radio'

import { useRadioChecked } from './use-radio-checked'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = ({ name, ...rest }: Props) => {
  const checked = useRadioChecked(name, rest.value)

  return <PicassoRadio checked={checked} {...rest} />
}

export default Radio
