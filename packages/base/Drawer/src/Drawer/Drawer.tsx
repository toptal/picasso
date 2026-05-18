import React from 'react'
import { Drawer as BaseUIDrawer } from '@base-ui/react/drawer'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useDrawer, usePicassoRoot } from '@toptal/picasso-provider'
import type { ReactNode } from 'react'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'
import { Slide } from '@toptal/picasso-slide'
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
  /** @deprecated [PF-1994] No-op since the migration to @base-ui/react/drawer; the popup is always portaled. */
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

const swipeDirectionByAnchor = {
  left: 'left',
  right: 'right',
  top: 'up',
  bottom: 'down',
} as const

export const Drawer = ({
  anchor = 'right',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disablePortal: _disablePortal = false,
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
    className,
    style,
    'data-testid': testId,
    'data-private': dataPrivate,
  } = props
  const { setHasDrawer } = useDrawer()
  const container = usePicassoRoot()

  usePageScrollLock(Boolean(maintainBodyScrollLock && open))

  useIsomorphicLayoutEffect(() => {
    setHasDrawer(open)

    return () => {
      setHasDrawer(false)
    }
  }, [open, setHasDrawer])

  const handleOnClose = () => {
    onClose?.()
  }

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
      swipeDirection={swipeDirectionByAnchor[anchor]}
    >
      <BaseUIDrawer.Portal container={container ?? undefined} keepMounted>
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
                '-webkit-tap-highlight-color-transparent',
                'transition-opacity duration-300',
                'data-[closed]:opacity-0',
                transparentBackdrop ? 'bg-black/0' : 'bg-black/50'
              )}
            />
          )}
          <BaseUIDrawer.Popup
            data-testid={testId}
            data-private={dataPrivate}
          >
            <Slide
              in={open}
              direction={oppositeDirection[anchor]}
              timeout={transitionProps?.timeout}
              onExited={transitionProps?.onExited}
            >
              <DrawerPaper anchor={anchor}>
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
            </Slide>
          </BaseUIDrawer.Popup>
        </BaseUIDrawer.Viewport>
      </BaseUIDrawer.Portal>
    </BaseUIDrawer.Root>
  )
}

Drawer.displayName = 'Drawer'

export default Drawer
