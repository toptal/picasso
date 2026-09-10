import React, { useContext } from 'react'
import type { RadioProps } from '@toptal/picasso-radio'
import { Radio as PicassoRadio } from '@toptal/picasso-radio'
import { Field } from 'react-final-form'

import { RadioGroupContext } from '../RadioGroup'
import { assertFieldName } from '../Field/assert-field-name'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = ({ name, ...rest }: Props) => {
  const groupName = useContext(RadioGroupContext)
  const fieldName = name || groupName

  assertFieldName(fieldName)

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Field name={fieldName!} type='radio' value={rest.value}>
      {({ input }) => <PicassoRadio checked={input.checked} {...rest} />}
    </Field>
  )
}

export default Radio
