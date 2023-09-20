import { Drawer as MUIDrawer } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps, TransitionProps } from '@toptal/picasso-shared'
import { useDrawer, usePicassoRoot } from '@toptal/picasso-provider'
import type { ReactNode } from 'react'
import React from 'react'

import { CloseMinor16 } from '../Icon'
import styles from './styles'
import ButtonCircular from '../ButtonCircular'
import Container from '../Container'
import DrawerTitle from '../DrawerTitle'
import { useIsomorphicLayoutEffect } from '../utils'
import { usePageScrollLock } from '../utils/use-page-scroll-lock'

type AnchorType = 'bottom' | 'left' | 'right' | 'top'

type WidthType = 'narrow' | 'regular' | 'medium' | 'wide' | 'ultra-wide'

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
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoDrawer' })

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
    ...rest
  } = props
  const classes = useStyles()
  const { setHasDrawer } = useDrawer()
  const theme = useTheme()
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
    if (onClose) {
      onClose()
    }
  }

  return (
    <MUIDrawer
      {...rest}
      open={open}
      onClose={handleOnClose}
      BackdropProps={{ invisible: transparentBackdrop }}
      disablePortal={disablePortal}
      container={container}
      disableScrollLock
      ModalProps={{ style: { zIndex: theme.zIndex.drawer } }}
      SlideProps={transitionProps}
    >
      <Container
        flex
        direction='column'
        className={cx(classes.container, classes[width])}
      >
        <DrawerTitle title={title} />
        <Container flex className={classes.content}>
          {children}
        </Container>
        <ButtonCircular
          variant='flat'
          icon={<CloseMinor16 />}
          onClick={handleOnClose}
          className={classes.closeButton}
          aria-label='Close drawer'
        />
      </Container>
    </MUIDrawer>
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
