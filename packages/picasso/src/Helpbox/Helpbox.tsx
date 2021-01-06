import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

import Container, { VariantType as ContainerVariantType } from '../Container'
import HelpboxTitle from '../HelpboxTitle'
import HelpboxContent from '../HelpboxContent'
import HelpboxActions from '../HelpboxActions'
import { CloseMinor16 } from '../Icon'
import Button from '../Button'
import styles from './styles'
import HelpboxContext from './HelpboxContext'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
  /** Color variant of Helpbox */
  variant?: ContainerVariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface StaticProps {
  Title: typeof HelpboxTitle
  Content: typeof HelpboxContent
  Actions: typeof HelpboxActions
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
      // eslint-disable-next-line react/jsx-props-no-spreading
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
        <Button.Circular
          className={classes.closeButton}
          onClick={onClose}
          icon={<CloseMinor16 color='dark-grey' />}
        />
      )}
    </Container>
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Helpbox.defaultProps = {}

Helpbox.displayName = 'Helpbox'

Helpbox.Title = HelpboxTitle

Helpbox.Content = HelpboxContent

Helpbox.Actions = HelpboxActions

export default Helpbox as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
