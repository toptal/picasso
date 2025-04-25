import React, { useRef, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import cx from 'classnames'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useDrawer, usePicassoRoot } from '@toptal/picasso-provider'
import type { ReactNode } from 'react'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import { Slide } from '@toptal/picasso-slide'
import { Backdrop } from '@toptal/picasso-backdrop'
import { Container } from '@toptal/picasso-container'
import {
  useIsomorphicLayoutEffect,
  usePageScrollLock,
} from '@toptal/picasso-utils'

import type { AnchorType, WidthType } from '../types'
import { DrawerTitle } from '../DrawerTitle'
import { DrawerPaper } from '../DrawerPaper'

export interface Props extends BaseProps {
  /** Side from which the drawer will appear.  */
  anchor?: AnchorType
  /** Drawer content */
  children: ReactNode
  /** Disable the portal behavior. The children stay within it's parent DOM hierarchy. */
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
}

const widthClassName: Record<WidthType, string> = {
  'ultra-wide': 'w-[73.75rem]',
  narrow: 'w-[100vw] max-w-[100vw] sm:w-[27.5rem] sm:max-w-full',
  regular: 'w-[35rem]',
  medium: 'w-[40rem]',
  wide: 'w-[60rem]',
}

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
} as const

export const Drawer = (props: Props) => {
  const {
    children,
    disablePortal,
    open,
    onClose,
    title,
    width = 'regular',
    transitionProps,
    maintainBodyScrollLock = true,
    transparentBackdrop,
    disableBackdrop,
    anchor = 'right',
    className,
    style,
    'data-testid': testId,
    'data-private': dataPrivate,
  } = props
  const { setHasDrawer } = useDrawer()
  const picassoRootContainer = usePicassoRoot()
  const ref = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  usePageScrollLock(Boolean(maintainBodyScrollLock && open))

  useIsomorphicLayoutEffect(() => {
    setHasDrawer(open)

    const cleanup = () => {
      setHasDrawer(false)
    }

    return cleanup
  }, [open, setHasDrawer])

  const handleOnClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleEscapeKeyDown = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  const containerElement = useCallback(() => {
    return picassoRootContainer
  }, [picassoRootContainer])

  return (
    <Dialog.Root
      open={open}
      modal={false}
      onOpenChange={(state: boolean) => {
        if (open && !state) {
          if (disableBackdrop) {
            return
          }

          if (onClose) {
            onClose()
          }
        }
      }}
    >
      <Dialog.Portal
        container={!disablePortal ? containerElement() : undefined}
      >
        <div
          ref={ref}
          className={cx(className, 'z-drawer inset-0 fixed', {
            fixed: !disableBackdrop,
          })}
          data-testid={testId}
          data-private={dataPrivate}
          style={style}
        >
          {!disableBackdrop && (
            <div className='fixed inset-0 z-0'>
              <Backdrop
                open={open}
                invisible={transparentBackdrop}
                aria-hidden='true'
              />
            </div>
          )}

          <Dialog.Content
            onEscapeKeyDown={handleEscapeKeyDown}
            className='outline-none pointer-events-auto'
            style={{
              position: 'relative',
              zIndex: 1,
              maxHeight: '100%',
              margin: 'auto',
              display: 'flex',
            }}
            onCloseAutoFocus={e => {
              e.preventDefault()
              if (transitionProps?.onExited) {
                transitionProps.onExited(drawerRef.current as HTMLElement)
              }
            }}
          >
            <Slide
              in={open}
              direction={oppositeDirection[anchor]}
              timeout={transitionProps?.timeout}
              onExited={transitionProps?.onExited}
            >
              <DrawerPaper anchor={anchor} ref={drawerRef}>
                <Container
                  flex
                  direction='column'
                  className={cx(
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
            </Slide>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Drawer.displayName = 'Drawer'

Drawer.defaultProps = {
  anchor: 'right',
  disablePortal: false,
  onClose: () => {},
  width: 'regular',
}

export default Drawer
