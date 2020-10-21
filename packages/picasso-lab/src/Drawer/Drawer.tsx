import MUIDrawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/styles'
import { Button, Container, Typography } from '@toptal/picasso'
import { BaseProps, useDrawer } from '@toptal/picasso-shared'
import { CloseMinor16 } from '@toptal/picasso/Icon'
import React, { FunctionComponent, ReactNode, useEffect } from 'react'

import styles from './styles'

type AnchorType = 'bottom' | 'left' | 'right' | 'top'

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
  title: ReactNode
  /** Callback fired when the component requests to be closed. */
  onClose?: () => void
}

const useStyles = makeStyles(styles, { name: 'PicassoDrawer' })

export const Drawer: FunctionComponent<Props> = ({
  children,
  disablePortal,
  open,
  onClose,
  title,
  ...rest
}) => {
  const classes = useStyles()
  const { hasDrawer, setHasDrawer } = useDrawer()

  useEffect(() => {
    setHasDrawer(open)
  }, [open, setHasDrawer])

  const handleOnClose = () => {
    setHasDrawer(false)

    if (onClose) {
      onClose()
    }
  }

  return (
    <MUIDrawer
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      open={hasDrawer}
      onClose={handleOnClose}
      disablePortal={disablePortal}
    >
      <Container className={classes.drawer}>
        <Container
          flex
          alignItems='center'
          padded='small'
          className={classes.header}
        >
          <Typography variant='heading' size='medium' className={classes.title}>
            {title}
          </Typography>
          <Button.Action icon={<CloseMinor16 />} onClick={handleOnClose} />
        </Container>
        <Container className={classes.content}>{children}</Container>
      </Container>
    </MUIDrawer>
  )
}

Drawer.displayName = 'Drawer'

Drawer.defaultProps = {
  anchor: 'right',
  disablePortal: false,
  onClose: () => {}
}

export default Drawer
