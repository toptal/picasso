import { ValueType } from '../../types'

const fireOnChangeEvent = ({
  event,
  value: eventValue,
  name,
  onChange
}: {
  event: any
  value: ValueType | ValueType[]
  name?: string
  onChange?: (event: any) => void
}) => {
  event.persist()
  event.target = { value: eventValue, name }
  onChange?.(event)
}

export default fireOnChangeEvent
