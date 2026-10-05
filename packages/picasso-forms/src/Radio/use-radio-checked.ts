import { useContext } from 'react'
import { useField } from 'react-final-form'

import { assertFieldName } from '../Field/assert-field-name'
import { RadioGroupContext } from '../RadioGroup'

/**
 * Whether the radio with this `value` is the checked one in its field: the
 * radio's own `name`, or the enclosing `RadioGroup`'s
 */
export const useRadioChecked = (name: string | undefined, value: unknown) => {
  const groupName = useContext(RadioGroupContext)
  const fieldName = name || groupName

  assertFieldName(fieldName)

  return useField(fieldName, { type: 'radio', value }).input.checked
}
