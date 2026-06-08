import React, { useRef } from 'react'
import { Drawer as BaseUIDrawer } from '@base-ui/react/drawer'
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
        <BaseUIDrawer.Backdrop
          className={twMerge(
            'z-drawer fixed inset-0 bg-black transition-opacity duration-300',
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            transparentBackdrop ? 'bg-black/0' : 'bg-black/50'
          )}
        />
      )}
      <BaseUIDrawer.Popup
        ref={popupRef}
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
      </BaseUIDrawer.Popup>
    </>
  )

  return (
    <BaseUIDrawer.Root
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
      {disablePortal ? (
        overlay
      ) : (
        <BaseUIDrawer.Portal container={container}>
          {overlay}
        </BaseUIDrawer.Portal>
      )}
    </BaseUIDrawer.Root>
  )
}

Drawer.displayName = 'Drawer'

export default Drawer
