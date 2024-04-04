import { Radio } from '../Radio'
import { RadioGroup } from '../RadioGroup'

type RadioCompoundType = typeof Radio & {
  Group: typeof RadioGroup
}

export const RadioCompound: RadioCompoundType = Object.assign(Radio, {
  Group: RadioGroup,
})
