import React from 'react'
import type { ButtonRadioProps } from '@toptal/picasso-button'
import { ButtonRadio as PicassoButtonRadio } from '@toptal/picasso-button'

import { RadioChecked } from '../Radio/RadioChecked'

export type Props = ButtonRadioProps & {
  name?: string
}

const ButtonRadio = ({ name, ...rest }: Props): React.ReactElement => (
  <RadioChecked name={name} value={rest.value}>
    {checked => <PicassoButtonRadio checked={checked} {...rest} />}
  </RadioChecked>
)

ButtonRadio.displayName = 'ButtonRadio'

export default ButtonRadio
