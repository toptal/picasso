import React, { useContext } from 'react'
import type { ButtonRadioProps } from '@toptal/picasso-button'
import { ButtonRadio as PicassoButtonRadio } from '@toptal/picasso-button'
import { Field } from 'react-final-form'

import { RadioGroupContext } from '../RadioGroup'

export type Props = ButtonRadioProps & {
  name?: string
}

const ButtonRadio = ({ name, ...rest }: Props) => {
  const groupName = useContext(RadioGroupContext)

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Field name={name || groupName!} type='radio' value={rest.value}>
      {({ input }) => <PicassoButtonRadio checked={input.checked} {...rest} />}
    </Field>
  )
}

ButtonRadio.displayName = 'ButtonRadio'

export default ButtonRadio
