import { Option } from '../../types'

const removeDuplicatedOptions = (options: Option[]) => {
  const values = new Set()

  return options.filter(option => {
    if (!values.has(option.value)) {
      values.add(option.value)

      return true
    }

    return false
  })
}

export default removeDuplicatedOptions
