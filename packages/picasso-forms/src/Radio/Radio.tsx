import React, { useContext } from 'react'
import type { RadioProps } from '@toptal/picasso-radio'
import { Radio as PicassoRadio } from '@toptal/picasso-radio'
import { Field } from 'react-final-form'

import { RadioGroupContext } from '../RadioGroup'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = ({ name, ...rest }: Props) => {
  const groupName = useContext(RadioGroupContext)

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Field name={name || groupName!} type='radio' value={rest.value}>
      {({ input }) => <PicassoRadio checked={input.checked} {...rest} />}
    </Field>
  )
}

export default Radio
