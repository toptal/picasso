import type { ClassNameMap } from '@material-ui/core/styles/withStyles'
import type { SpacingType } from '@toptal/picasso-provider'
import { isPicassoSpacing } from '@toptal/picasso-provider'

const getBaseSpacingClasses = (
  properties: Record<string, SpacingType | undefined>,
  classes: ClassNameMap<string>
) => {
  const baseSpacingClasses = []
  const { padded, gap } = properties

  if (padded && isPicassoSpacing(padded)) {
    baseSpacingClasses.push(classes[`spacing${padded.indexOf()}Padding`])
  }

  if (gap && isPicassoSpacing(gap)) {
    baseSpacingClasses.push(classes[`spacing${gap.indexOf()}Gap`])
  }

  ;['top', 'right', 'bottom', 'left'].forEach(property => {
    const value = properties[property]

    if (value && isPicassoSpacing(value)) {
      baseSpacingClasses.push(
        classes[`${property}Spacing${value.indexOf()}Margin`]
      )
    }
  })

  return baseSpacingClasses
}

export default getBaseSpacingClasses
