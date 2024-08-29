import React, { forwardRef } from 'react'
import type { SizeType } from '@toptal/picasso-shared'
import { Star16, StarSolid16, Star24, StarSolid24 } from '@toptal/picasso-icons'

export interface Props {
  active: boolean
  interactive: boolean
  size: SizeType<'small' | 'large'>
}

const iconsBySize = {
  small: [Star16, StarSolid16],
  large: [Star24, StarSolid24],
}

const RatingIcon = forwardRef<HTMLDivElement, Props>(function RatingIcon(
  props,
  ref
) {
  const { active, interactive, size, ...rest } = props

  const iconColor = 'yellow'
  const iconClasses = interactive
    ? 'transition-all duration-350 ease-out hover:scale-150'
    : ''
  const [Icon, IconSolid] = iconsBySize[size] || iconsBySize.small

  return (
    <span {...rest} ref={ref}>
      {active ? (
        <IconSolid color={iconColor} className={iconClasses} />
      ) : (
        <Icon color={iconColor} className={iconClasses} />
      )}
    </span>
  )
})

RatingIcon.defaultProps = {
  interactive: true,
}

RatingIcon.displayName = 'RatingIcon'

export default RatingIcon
