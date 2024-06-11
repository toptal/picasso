import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { BackMinor16, ChevronMinor16 } from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'
import { Button as MUIButtonBase } from '@mui/base/Button'

type DirectionType = 'left' | 'right'

export interface Props extends BaseProps {
  /** The direction the button should indicate. */
  direction: DirectionType
  /** If `true`, the component is disabled. */
  disabled?: boolean
}

export const TabScrollButton = forwardRef<HTMLDivElement, Props>(
  function TabScrollButton(props, ref) {
    const { className, style, direction, disabled, ...rest } = props

    if (disabled) {
      return null
    }

    return (
      <Container
        {...rest}
        ref={ref}
        className={twMerge('relative', className)}
        style={style}
      >
        <Container
          className={twJoin(
            'absolute w-10 h-full z-[2]',
            direction === 'left'
              ? 'bg-gradient-to-r from-white from-50% left-0'
              : 'bg-gradient-to-l from-white from-50% right-0'
          )}
        >
          <MUIButtonBase
            className={twJoin(
              'border-0 p-0 bg-transparent cursor-pointer absolute w-4 h-full flex items-center',
              direction === 'left' ? 'left-0' : 'right-0'
            )}
            aria-label={`${direction} button`}
            data-testid={`tab-scroll-button-${direction}`}
          >
            {direction === 'left' ? <BackMinor16 /> : <ChevronMinor16 />}
          </MUIButtonBase>
        </Container>
      </Container>
    )
  }
)

TabScrollButton.displayName = 'TabScrollButton'

export default TabScrollButton
