import React, { forwardRef } from 'react'
import { ButtonBase } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { BackMinor16, ChevronMinor16 } from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
          className={twMerge(
            'absolute w-10 h-full z-10',
            direction === 'left'
              ? 'bg-gradient-to-r from-white via-white to-transparent'
              : 'bg-gradient-to-l from-white via-white to-transparent',
            direction === 'left' ? 'left-0' : 'right-0'
          )}
        >
          <ButtonBase
            className={twMerge(
              'absolute w-4 h-full',
              direction === 'left' ? 'left-0' : 'right-0'
            )}
            aria-label={`${direction} button`}
            data-testid={`tab-scroll-button-${direction}`}
          >
            {direction === 'left' ? <BackMinor16 /> : <ChevronMinor16 />}
          </ButtonBase>
        </Container>
      </Container>
    )
  }
)

TabScrollButton.displayName = 'TabScrollButton'

export default TabScrollButton
