import { useContext } from 'react'
import { useField as useFinalFormField } from 'react-final-form'

import { assertFieldName } from '../Field/assert-field-name'
import { useField } from '../FinalField/use-field'
import { RadioGroupContext } from '../RadioGroup'

/**
 * Whether the radio with this `value` is the checked one in its field: the
 * radio's own `name`, or the enclosing `RadioGroup`'s
 */
export const useRadioChecked = (name: string | undefined, value: unknown) => {
  const groupName = useContext(RadioGroupContext)
  const fieldName = name || groupName

  assertFieldName(fieldName)

  // A group's field keeps its state across a remount and must create the
  // field entry itself, so a radio inside it stays on react-final-form's hook.
  // A radio with a field of its own keeps the state itself. A radio keeps its
  // name and group while mounted, so every render runs the same hook
  const useRadioField = fieldName === groupName ? useFinalFormField : useField

  return useRadioField(fieldName, { type: 'radio', value }).input.checked
}
