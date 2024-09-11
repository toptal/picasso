import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import { LogoNoTrademark } from '@toptal/picasso-icons'

import { avatarLogoClassesBySize, classBySize, clipClassBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  children: ReactNode
  size: Size
  showEmblem?: boolean
}

const showLogo = (size: Size, showEmblem?: boolean): boolean => {
  const isTooSmall = ['xsmall', 'xxsmall'].includes(size)

  if (isTooSmall || !showEmblem) {
    return false
  }

  return true
}

const AvatarLogo = ({ size }: Pick<Props, 'size'>) => (
  <div
    className={twJoin(
      'flex absolute bottom-0 left-0',
      avatarLogoClassesBySize.root[size]
    )}
    role='img'
    aria-label='photo placeholder'
  >
    <LogoNoTrademark
      color='blue'
      style={{ minWidth: '1px', minHeight: '1px' }}
      className={avatarLogoClassesBySize.logo[size]}
    />
  </div>
)

export const AvatarWrapper = (props: Props) => {
  const {
    children,
    className,
    style,
    'data-testid': dataTestId,
    size,
    showEmblem = false,
  } = props

  return (
    <div>
      <div
        className={twJoin(`relative`, showLogo(size, showEmblem) && 'bg-white')}
      >
        <div>
          <p className='text-xxl text-white'>Test text white</p>
          <p className='text-xxl text-blue-100'>Test text blue 100</p>
          <p className='text-xxl text-blue-150'>Test text blue 150</p>
          <p className='text-xxl text-blue-200'>Test text blue 200</p>
        </div>
        <div
          style={style}
          data-testid={dataTestId}
          className={twMerge(
            'relative bg-gray-500 text-[1rem]',
            'grid place-items-center',

            'blur-4',
            classBySize[size],
            clipClassBySize[size],
            className
          )}
        >
          {children}
        </div>
        {showLogo(size, showEmblem) && <AvatarLogo size={size} />}
      </div>
    </div>
  )
}

export default AvatarWrapper
