import { Option, OptionGroups } from '../../types'
import { isOptionsType } from '..'

interface Props {
  options: Option[] | OptionGroups
  limit: number
}

const limitOptions = ({ options, limit }: Props): Option[] | OptionGroups => {
  if (isOptionsType(options)) {
    return limitFlatOptions({ options, limit })
  }

  return Object.keys(options).reduce((result: OptionGroups, group) => {
    result[group] = limitFlatOptions({
      options: options[group],
      limit
    })

    return result
  }, {})
}

const limitFlatOptions = ({
  options,
  limit
}: Props & { options: Option[] }): Option[] => options.slice(0, limit)

export default limitOptions
