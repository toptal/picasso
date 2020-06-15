import React from 'react'
import { Radio as PicassoRadio, RadioProps } from '@toptal/picasso'
import { Field } from 'react-final-form'

// Intersection with the type { name?: string } is needed here because of
// TS compiler issue https://github.com/microsoft/TypeScript/issues/34793
export type Props = RadioProps & {
  name?: string
}

const Radio = (props: Props) => (
  <Field name={props.name!} type='radio' value={props.value}>
    {({ input }) => (
      <PicassoRadio
        checked={input.checked}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    )}
  </Field>
)

export default Radio
