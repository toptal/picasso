import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

import { useCombinedRefs } from '../utils'
import useScrollableShades from './hooks/use-scrollable-shades'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Content of Modal */
  children: ReactNode
}

export const ModalContent = forwardRef<HTMLDivElement, Props>(
  function ModalContent(props, ref) {
    const { children, className, style, ...rest } = props

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
      <div className='flex relative flex-auto overflow-y-hidden'>
        {top && (
          <div
            className={cx(
              shadeClasses,
              gradientClasses,
              'top-0 bg-gradient-to-b'
            )}
          />
        )}
        {bottom && (
          <div
            className={cx(
              shadeClasses,
              gradientClasses,
              'bottom-0 bg-gradient-to-t'
            )}
          />
        )}
        <div
          {...rest}
          style={style}
          ref={modalContentRef}
          className={cx('pt-6 px-8 pb-8 overflow-auto flex-auto', className)}
        >
          {children}
        </div>
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

export default ModalContent
