import React, { useContext } from 'react'
import { Button, ButtonRadioProps } from '@toptal/picasso'
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
      {({ input }) => <Button.Radio checked={input.checked} {...rest} />}
    </Field>
  )
}

ButtonRadio.displayName = 'ButtonRadio'

export default ButtonRadio
