import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import type { VariantType as ContainerVariantType } from '@toptal/picasso-container'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import HelpboxContext from './HelpboxContext'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
  /** Color variant of Helpbox */
  variant?: ContainerVariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

// eslint-disable-next-line react/display-name
export const Helpbox = forwardRef<HTMLDivElement, Props>(function Helpbox(
  props,
  ref
) {
  const { className, style, children, variant, onClose, ...rest } = props

  return (
    <Container
      {...rest}
      ref={ref}
      rounded
      className={twMerge('relative', className)}
      style={style}
      bordered={!variant || variant === 'white'}
      variant={variant}
      padded='medium'
    >
      <HelpboxContext.Provider value={{ closeable: Boolean(onClose) }}>
        {children}
      </HelpboxContext.Provider>
      {onClose && (
        <ButtonCircular
          // TODO: [FX-5219] need to avoid such customization
          className='absolute right-[1.5em] top-[1.5em] bg-transparent border-none p-0 hover:bg-transparent active:bg-transparent'
          onClick={onClose}
          icon={<CloseMinor16 color='dark-grey' />}
        />
      )}
    </Container>
  )
})

Helpbox.displayName = 'Helpbox'

export default Helpbox
