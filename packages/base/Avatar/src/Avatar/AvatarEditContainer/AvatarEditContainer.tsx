import React, { useState } from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { Pencil16, Pencil24 } from '@toptal/picasso-icons'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { rootClassBySize, svgClassBySize } from './styles'
import { AVATAR_DROPZONE_SVG_SHAPES } from '../../AvatarDropzoneSvg'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  size?: Size
  disabled?: boolean
  onClick?: (event: React.MouseEvent) => void
}

export const AvatarEditContainer = (props: Props) => {
  const { size = 'small', onClick, 'data-testid': dataTestId } = props
  const [focused, setFocused] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shapes = AVATAR_DROPZONE_SVG_SHAPES[size!]

  const PencilIconComponent =
    size === 'xxsmall' || size === 'xsmall' ? Pencil16 : Pencil24

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <button
      className={twJoin(
        'border-none cursor-pointer absolute left-0 top-0 flex justify-center',
        'items-center outline-none bg-transparent',
        rootClassBySize[size]
      )}
      data-testid={dataTestId}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <svg
        className={twJoin('-m-[3px] absolute', svgClassBySize[size])}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          className={'fill-graphite-800/70'}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.background}
        />
        <path
          className={twJoin(
            'stroke-blue-500',
            focused ? '[display:initial]' : 'hidden'
          )}
          fillRule='evenodd'
          clipRule='evenodd'
          d={shapes.outline}
          strokeOpacity='.48'
          strokeWidth='3'
          strokeLinejoin='round'
        />
      </svg>
      <PencilIconComponent className='text-white z-modal' />
    </button>
  )
}

AvatarEditContainer.displayName = 'AvatarEditContainer'

AvatarEditContainer.defaultProps = {
  size: 'small',
}

export default AvatarEditContainer
