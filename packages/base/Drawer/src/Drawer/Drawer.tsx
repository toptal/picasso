import React from 'react'
import { Drawer as BaseUIDrawer } from '@base-ui/react/drawer'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useDrawer, usePicassoRoot } from '@toptal/picasso-provider'
import type { ReactNode } from 'react'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import {
  useIsomorphicLayoutEffect,
  usePageScrollLock,
} from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { AnchorType, WidthType } from '../types'
import { DrawerTitle } from '../DrawerTitle'
import { DrawerPaper } from '../DrawerPaper'

export interface Props extends BaseProps {
  /** Side from which the drawer will appear.  */
  anchor?: AnchorType
  /** Drawer content */
  children: ReactNode
  /** When true, renders inline (no portal) instead of being mounted in the document body */
  disablePortal?: boolean
  /** Specify if the drawer is opened or not */
  open: boolean
  /** Specify the drawer title */
  title?: ReactNode
  /** Callback fired when the component requests to be closed. */
  onClose?: () => void
  /** Width of Drawer */
  width?: WidthType
  /** Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) */
  transitionProps?: TransitionProps
  /** enable Drawer to maintain body scroll lock */
  maintainBodyScrollLock?: boolean
  /** Specify the backdrop transparency  */
  transparentBackdrop?: boolean
  /** Remove the backdrop and leave elements behind interactive  */
  disableBackdrop?: boolean
  /** Disable the swipe-to-dismiss gesture. Defaults to `true` for parity with the pre-@base-ui/react Drawer; pass `false` to opt into the new gesture. */
  disableSwipeToDismiss?: boolean
}

const widthClassName: Record<WidthType, string> = {
  'ultra-wide': 'w-[73.75rem]',
  narrow: 'w-[100vw] max-w-[100vw] sm:w-[27.5rem] sm:max-w-full',
  regular: 'w-[35rem]',
  medium: 'w-[40rem]',
  wide: 'w-[60rem]',
}

const popupPositionClassName: Record<AnchorType, string> = {
  right:
    'top-0 h-full left-auto right-0 max-w-full data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full',
  left:
    'top-0 h-full left-0 right-auto max-w-full data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full',
  top: 'top-0 bottom-auto left-0 right-0 h-auto max-h-full data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full',
  bottom:
    'bottom-0 top-auto left-0 right-0 h-auto max-h-full data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
}

const swipeDirectionByAnchor = {
  left: 'left',
  right: 'right',
  top: 'up',
  bottom: 'down',
} as const

export const Drawer = ({
  anchor = 'right',
  disablePortal = false,
  onClose = () => {},
  width = 'regular',
  ...props
}: Props) => {
  const {
    children,
    open,
    title,
    transitionProps,
    maintainBodyScrollLock = true,
    transparentBackdrop,
    disableBackdrop,
    disableSwipeToDismiss = true,
    className,
    style,
    'data-testid': testId,
    'data-private': dataPrivate,
  } = props
  const transitionDurationMs =
    typeof transitionProps?.timeout === 'number'
      ? transitionProps.timeout
      : 300
  const transitionDurationStyle: React.CSSProperties = {
    transitionDuration: `${transitionDurationMs}ms`,
  }
  const { setHasDrawer } = useDrawer()
  const container = usePicassoRoot()

  usePageScrollLock(Boolean(maintainBodyScrollLock && open))

  useIsomorphicLayoutEffect(() => {
    setHasDrawer(open)

    const cleanup = () => {
      setHasDrawer(false)
    }

    return cleanup
  }, [open, setHasDrawer])

  const handleOnClose = () => {
    onClose?.()
  }

  const viewport = (
    <BaseUIDrawer.Viewport
      className={twMerge(
        'z-drawer',
        !disableBackdrop && 'fixed inset-0',
        className
      )}
      style={style}
    >
      {!disableBackdrop && (
        <BaseUIDrawer.Backdrop
          className={twMerge(
            'fixed -z-[1] inset-0',
            'transition-opacity',
            'data-[closed]:opacity-0',
            transparentBackdrop ? 'bg-black/0' : 'bg-black/50'
          )}
          style={transitionDurationStyle}
        />
      )}
      <BaseUIDrawer.Popup
        data-testid={testId}
        data-private={dataPrivate}
        style={transitionDurationStyle}
        onTransitionEnd={(e: React.TransitionEvent<HTMLDivElement>) => {
          if (e.propertyName === 'transform' && !open) {
            transitionProps?.onExited?.(e.currentTarget)
          }
        }}
        className={twMerge(
          'fixed z-drawer transition-transform',
          popupPositionClassName[anchor]
        )}
      >
        <DrawerPaper>
          <Container
            flex
            direction='column'
            className={twMerge(
              'max-w-full relative flex-1',
              widthClassName[width]
            )}
          >
            <DrawerTitle title={title} />
            <Container flex className='flex-1'>
              {children}
            </Container>
            <ButtonCircular
              variant='flat'
              icon={<CloseMinor16 />}
              onClick={handleOnClose}
              className='absolute right-6 top-4'
              aria-label='Close drawer'
            />
          </Container>
        </DrawerPaper>
      </BaseUIDrawer.Popup>
    </BaseUIDrawer.Viewport>
  )

  return (
    <BaseUIDrawer.Root
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          handleOnClose()
        }
      }}
      modal='trap-focus'
      disablePointerDismissal={disableBackdrop}
      swipeDirection={
        disableSwipeToDismiss ? undefined : swipeDirectionByAnchor[anchor]
      }
    >
      {disablePortal ? (
        viewport
      ) : (
        <BaseUIDrawer.Portal container={container ?? undefined} keepMounted>
          {viewport}
        </BaseUIDrawer.Portal>
      )}
    </BaseUIDrawer.Root>
  )
}

Drawer.displayName = 'Drawer'

export default Drawer
