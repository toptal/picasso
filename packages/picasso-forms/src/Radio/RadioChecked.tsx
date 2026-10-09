import type { ReactElement } from 'react'
import React, { useContext } from 'react'
import { useField as useFinalFormField } from 'react-final-form'

import { assertFieldName } from '../Field/assert-field-name'
import { useField } from '../FinalField/use-field'
import { RadioGroupContext } from '../RadioGroup'

interface Props {
  /** The radio's own field, if it has one rather than its group's */
  name?: string
  /** The value the radio stands for */
  value: unknown
  /** Renders the radio with whether it is the checked one */
  children: (checked: boolean | undefined) => ReactElement
}

interface FieldProps extends Omit<Props, 'name'> {
  name: string
}

const GroupFieldChecked = ({
  name,
  value,
  children,
}: FieldProps): ReactElement =>
  children(useFinalFormField(name, { type: 'radio', value }).input.checked)

const OwnFieldChecked = ({ name, value, children }: FieldProps): ReactElement =>
  children(useField(name, { type: 'radio', value }).input.checked)

/**
 * Renders `children` with whether the radio with this `value` is the checked
 * one in its field: the radio's own `name`, or the enclosing `RadioGroup`'s
 */
export const RadioChecked = ({
  name,
  value,
  children,
}: Props): ReactElement => {
  const groupName = useContext(RadioGroupContext)
  const fieldName = name || groupName

  assertFieldName(fieldName)

  // A group's field keeps its state across a remount and must create the
  // field entry itself, so a radio inside it stays on react-final-form's hook.
  // A radio with a field of its own keeps the state itself. The two run
  // different hooks, so a radio whose `name` moves it between them remounts
  const FieldChecked =
    fieldName === groupName ? GroupFieldChecked : OwnFieldChecked

  return (
    <FieldChecked name={fieldName} value={value}>
      {children}
    </FieldChecked>
  )
}
