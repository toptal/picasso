import React from 'react'
import cx from 'classnames'
import type { SizeType } from '@toptal/picasso-shared'
import { Paper } from '@toptal/picasso-paper'

type PaperSize =
  | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>
  | 'full-screen'
type Alignment = 'top' | 'centered'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  align: Alignment
  children: React.ReactNode
  /** Width of modal */
  size: PaperSize
}

const fullscreenClasses = `h-full w-full max-h-full max-w-full`
const defaultClasses = `m-4 sm:h-auto sm:m-8 max-w-[calc(100%_-_2rem)] sm:max-w-[calc(100%_-_6rem)] rounded-md`

const sizeBasedClasses = {
  xsmall: `${defaultClasses} w-[20.5rem]`,
  small: `${defaultClasses} w-[32.5rem]`,
  medium: `${defaultClasses} w-[40.625rem]`,
  large: `${defaultClasses} w-[50rem]`,
  xlarge: `${defaultClasses} w-[75rem]`,
  'full-screen': fullscreenClasses,
}

const alignBasedClasses = {
  centered: 'relative',
  top: 'absolute top-0',
}

const getMaxHeightClass = (size: PaperSize, align: Alignment) => {
  if (size === 'full-screen') {
    return 'max-h-full'
  }

  if (align === 'top') {
    return `max-h-[calc(100%_-_2rem)] sm:max-h-[calc(100%_-_4rem)]`
  }

  return `max-h-[calc(100%_-_2rem)] sm:max-h-[calc(100%_-_6rem)]`
}

export const ModalPaper = React.forwardRef<HTMLDivElement, Props>(
  function ModalPaper({ children, size, align, className, ...props }, ref) {
    return (
      <Paper
        ref={ref}
        role='dialog'
        elevation={2}
        className={cx(
          className,
          'outline-none overflow-y-auto',
          'flex flex-col',
          sizeBasedClasses[size],
          alignBasedClasses[align],
          getMaxHeightClass(size, align)
        )}
        {...props}
      >
        {children}
      </Paper>
    )
  }
)

export default ModalPaper
