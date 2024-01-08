import { useState } from 'react'

/** Set value to true */
type SetTruthy = () => void
/** Set value to false */
type SetFalsy = () => void
/** Toggle the value */
type Toggle = () => void
type IsTruthy = boolean

type UseBooleanType = (
  defaultValue?: boolean
) => [IsTruthy, SetTruthy, SetFalsy, Toggle]

/**
 *
 * @param defaultValue?: Boolean
 * @returns [isTruthy, setTruthy, setFalsy, toggle]
 */
const useBoolean: UseBooleanType = (defaultValue = false) => {
  const [isTruthy, setBoolean] = useState(defaultValue)

  const setTruthy: SetTruthy = () => setBoolean(true)
  const setFalsy: SetFalsy = () => setBoolean(false)
  const toggle: Toggle = () => setBoolean(value => !value)

  return [isTruthy, setTruthy, setFalsy, toggle]
}

export default useBoolean
