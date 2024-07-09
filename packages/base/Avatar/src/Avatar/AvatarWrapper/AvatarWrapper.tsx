import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import { Logo } from '@toptal/picasso-logo'

import { AvatarLogoClassesBySize, classBySize, clipClassBySize } from './styles'

export type Size = SizeType<'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  children: ReactNode
  size: Size
  emblem?: boolean
}

const showLogo = (size: Size, emblem?: boolean): boolean => {
  const isTooSmall = ['xsmall', 'xxsmall'].includes(size)

  if (isTooSmall || !emblem) {
    return false
  }

  return true
}

const AvatarLogo = ({ size }: Pick<Props, 'size'>) => (
  <div
    className={twJoin(
      'flex absolute bottom-0',
      AvatarLogoClassesBySize.root[size]
    )}
    role='img'
    aria-label='photo placeholder'
  >
    <Logo
      emblem
      variant='blue'
      // Necessary to decrease the default minWeight and minHeight so that the new width and height could apply
      // eslint-disable-next-line no-inline-styles/no-inline-styles
      style={{ minWidth: '1px', minHeight: '1px' }}
      className={AvatarLogoClassesBySize.logo[size]}
    />
  </div>
)

const AvatarWrapper = (props: Props) => {
  const {
    children,
    className,
    style,
    'data-testid': dataTestId,
    size,
    emblem = false,
  } = props

  return (
    <div
      className={twJoin(`flex relative`, showLogo(size, emblem) && 'bg-white')}
    >
      <div
        style={style}
        data-testid={dataTestId}
        className={twMerge(
          'relative bg-gray-500 text-[1rem] shrink-0 grow-0',
          classBySize[size],
          clipClassBySize[size],
          className
        )}
      >
        {children}
      </div>

      {showLogo(size, emblem) && <AvatarLogo size={size} />}
    </div>
  )
}

export default AvatarWrapper
