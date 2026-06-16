import React, { useRef, useState } from 'react'
// Backed by Dialog, not @base-ui/react/drawer: the drawer primitive always
// enables swipe-to-dismiss (its Viewport hard-wires useSwipeDismiss and omitting
// Viewport emits a dev console.error), and Picasso's Drawer has no swipe
// affordance. Dialog gives the same compound parts + slide transition data-attrs
// without swipe.
import { Dialog as BaseUIDialog } from '@base-ui/react/dialog'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useDrawer, usePicassoRoot } from '@toptal/picasso-provider'
import type { CSSProperties, ReactNode } from 'react'
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
  /** Animation lifecycle callbacks. `onExited` fires after the close animation completes; `timeout` (in ms) overrides the slide duration. */
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

const getTransitionDuration = (
  timeout: TransitionProps['timeout']
): number | undefined => {
  if (typeof timeout === 'number') {
    return timeout
  }

  return timeout?.enter ?? timeout?.appear
}

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
    className,
    style,
    'data-testid': testId,
    'data-private': dataPrivate,
  } = props
  const { setHasDrawer } = useDrawer()
  const container = usePicassoRoot()
  const popupRef = useRef<HTMLDivElement>(null)
  // @base-ui/react's Dialog.Popup requires a Dialog.Portal ancestor, and its
  // portal always relocates the popup (no inline mode). To emulate the legacy
  // `disablePortal` (children stay in the parent DOM hierarchy) we portal into
  // a mount node rendered inline at the Drawer's location instead of the root.
  const [inlineContainer, setInlineContainer] = useState<HTMLElement | null>(
    null
  )

  usePageScrollLock(Boolean(maintainBodyScrollLock && open))

  useIsomorphicLayoutEffect(() => {
    setHasDrawer(open)

    const cleanup = () => {
      setHasDrawer(false)
    }

    return cleanup
  }, [open, setHasDrawer])

  const transitionDuration = getTransitionDuration(transitionProps?.timeout)
  const popupStyle: CSSProperties | undefined =
    transitionDuration != null
      ? { ...style, transitionDuration: `${transitionDuration}ms` }
      : style

  const overlay = (
    <>
      {!disableBackdrop && (
        <BaseUIDialog.Backdrop
          className={twMerge(
            'z-drawer fixed inset-0 bg-black transition-opacity duration-300',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            transparentBackdrop ? 'bg-black/0' : 'bg-black/50'
          )}
        />
      )}
      <BaseUIDialog.Popup
        ref={popupRef}
        initialFocus={popupRef}
        render={
          <DrawerPaper
            anchor={anchor}
            className={className}
            style={popupStyle}
            data-testid={testId}
            data-private={dataPrivate}
          />
        }
      >
        <Container
          flex
          direction='column'
          className={twMerge('max-w-full relative flex-1', widthClassName[width])}
        >
          <DrawerTitle title={title} />
          <Container flex className='flex-1'>
            {children}
          </Container>
          <ButtonCircular
            variant='flat'
            icon={<CloseMinor16 />}
            onClick={() => onClose?.()}
            className='absolute right-6 top-4'
            aria-label='Close drawer'
          />
        </Container>
      </BaseUIDialog.Popup>
    </>
  )

  return (
    <BaseUIDialog.Root
      open={open}
      modal='trap-focus'
      disablePointerDismissal={disableBackdrop}
      onOpenChange={nextOpen => {
        if (!nextOpen) {
          onClose?.()
        }
      }}
      onOpenChangeComplete={nextOpen => {
        if (!nextOpen && popupRef.current) {
          transitionProps?.onExited?.(popupRef.current)
        }
      }}
    >
      {disablePortal && <span ref={setInlineContainer} />}
      <BaseUIDialog.Portal
        container={disablePortal ? inlineContainer : container}
      >
        {overlay}
      </BaseUIDialog.Portal>
    </BaseUIDialog.Root>
  )
}

Drawer.displayName = 'Drawer'

export default Drawer
