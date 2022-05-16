import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import Container, { VariantType as ContainerVariantType } from '../Container'
import HelpboxTitle from '../HelpboxTitle'
import HelpboxContent from '../HelpboxContent'
import HelpboxActions from '../HelpboxActions'
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
  name: 'PicassoHelpbox'
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
      padded='medium'
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

export default Object.assign(Helpbox, {
  Title: HelpboxTitle,
  Content: HelpboxContent,
  Actions: HelpboxActions
})
