import React, { useContext } from 'react'
import type { ButtonRadioProps } from '@toptal/picasso-button'
import { ButtonRadio as PicassoButtonRadio } from '@toptal/picasso-button'
import { Field } from 'react-final-form'

import { RadioGroupContext } from '../RadioGroup'
import { assertFieldName } from '../Field/assert-field-name'

export type Props = ButtonRadioProps & {
  name?: string
}

const ButtonRadio = ({ name, ...rest }: Props) => {
  const groupName = useContext(RadioGroupContext)
  const fieldName = name || groupName

  assertFieldName(fieldName)

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Field name={fieldName!} type='radio' value={rest.value}>
      {({ input }) => <PicassoButtonRadio checked={input.checked} {...rest} />}
    </Field>
  )
}

ButtonRadio.displayName = 'ButtonRadio'

export default ButtonRadio
