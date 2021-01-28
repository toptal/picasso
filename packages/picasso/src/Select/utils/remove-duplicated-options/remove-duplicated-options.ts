import { Option } from '../../types'

const removeDuplicatedOptions = (options: Option[]) =>
  options.filter((option, index) => {
    const innerIndex = options.findIndex(
      innerOption => innerOption.value === option.value
    )

    return innerIndex === index
  })

export default removeDuplicatedOptions
