import React from 'react'
import type { ButtonRadioProps } from '@toptal/picasso-button'
import { ButtonRadio as PicassoButtonRadio } from '@toptal/picasso-button'

import { useRadioChecked } from '../Radio/use-radio-checked'

export type Props = ButtonRadioProps & {
  name?: string
}

const ButtonRadio = ({ name, ...rest }: Props) => {
  const checked = useRadioChecked(name, rest.value)

  return <PicassoButtonRadio checked={checked} {...rest} />
}

ButtonRadio.displayName = 'ButtonRadio'

export default ButtonRadio
