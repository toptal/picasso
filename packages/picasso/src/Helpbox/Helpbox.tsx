import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

import type { VariantType as ContainerVariantType } from '../Container'
import { SPACING_6 } from '../utils'
import Container from '../Container'
import { CloseMinor16 } from '../Icon'
import ButtonCircular from '../ButtonCircular'
import styles from './styles'
import HelpboxContext from './HelpboxContext'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
  /** Color variant of Helpbox */
  variant?: ContainerVariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoHelpbox',
})

// eslint-disable-next-line react/display-name
export const Helpbox = forwardRef<HTMLDivElement, Props>(function Helpbox(
  props,
  ref
) {
  const { className, style, children, variant, onClose, ...rest } = props
  const classes = useStyles()

  return (
    <Container
      {...rest}
      ref={ref}
      rounded
      className={cx(classes.root, className)}
      style={style}
      bordered={!variant || variant === 'white'}
      variant={variant}
      padded={SPACING_6}
    >
      <HelpboxContext.Provider value={{ closeable: Boolean(onClose) }}>
        {children}
      </HelpboxContext.Provider>
      {onClose && (
        <ButtonCircular
          className={classes.closeButton}
          onClick={onClose}
          icon={<CloseMinor16 color='dark-grey' />}
        />
      )}
    </Container>
  )
})

Helpbox.displayName = 'Helpbox'

export default Helpbox
