import MUIDrawer from '@material-ui/core/Drawer'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { Button, Container } from '@toptal/picasso'
import { BaseProps, useDrawer } from '@toptal/picasso-shared'
import { CloseMinor16 } from '@toptal/picasso/Icon'
import React, { FunctionComponent, ReactNode, useLayoutEffect } from 'react'

import styles from './styles'
import DrawerTitle from '../DrawerTitle'

type AnchorType = 'bottom' | 'left' | 'right' | 'top'

type WidthType = 'regular' | 'wide'

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
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoDrawer' })

export const Drawer: FunctionComponent<Props> = props => {
  const {
    children,
    disablePortal,
    open,
    onClose,
    title,
    width,
    ...rest
  } = props
  const classes = useStyles()
  const { setHasDrawer } = useDrawer()

  useLayoutEffect(() => {
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
      disablePortal={disablePortal}
    >
      <Container flex className={cx(classes.container, classes[width!])}>
        <DrawerTitle title={title} />
        <Container flex className={classes.content}>{children}</Container>
        <Button.Circular
          variant='flat'
          icon={<CloseMinor16 />}
          onClick={handleOnClose}
          className={classes.closeButton}
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
  width: 'regular'
}

export default Drawer
