import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useCombinedRefs } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import useScrollableShades from './hooks/use-scrollable-shades'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
  classes?: { root?: string; topShade?: string; bottomShade?: string }
}
export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent(props, ref) {
    const { children, className, style, classes, ...rest } = props

    /**
     * This is necessary to ensure if ref is not passed in, there's still a ref to calculate
     * when to show the scrollable shades or not.
     */
    const modalContentRef = useCombinedRefs<HTMLDivElement>(ref)

    const { top, bottom } = useScrollableShades(modalContentRef)

    const shadeClasses =
      'z-[1] absolute pointer-events-none right-8 left-8 h-[112px]'
    const gradientClasses =
      'from-white to-transparent to-100% from-0% via-[2rem] via-white'

    return (
      <div
        className={twMerge(
          'flex relative flex-auto overflow-y-hidden',
          classes?.root
        )}
      >
        {top && (
          <div
            className={twMerge(
              shadeClasses,
              gradientClasses,
              classes?.topShade,
              'top-0 bg-gradient-to-b'
            )}
          />
        )}
        {bottom && (
          <div
            className={twMerge(
              shadeClasses,
              gradientClasses,
              classes?.bottomShade,
              'bottom-0 bg-gradient-to-t'
            )}
          />
        )}
        <div
          {...rest}
          style={style}
          ref={modalContentRef}
          className={twMerge(
            'pt-6 px-8 pb-8 overflow-auto flex-auto',
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

export default ModalContent
