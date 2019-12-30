import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
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
import { Close16 } from '../Icon'
import Button from '../Button'
import { HelpboxContextProps } from './types'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
  /** Color variant of Helpbox */
  variant?: ContainerVariantType
  /** Callback invoked when close is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface StaticProps {
  Title: typeof HelpboxTitle
  Content: typeof HelpboxContent
  Actions: typeof HelpboxActions
}

export const HelpboxContext = React.createContext<HelpboxContextProps>({})

// eslint-disable-next-line react/display-name
export const Helpbox = forwardRef<HTMLDivElement, Props>(function Helpbox(
  { classes, className, style, children, variant, onClose, ...rest },
  ref
) {
  return (
    <Container
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(classes.root, className)}
      style={style}
      bordered={!variant || variant === 'white'}
      variant={variant}
      padded='large'
    >
      <HelpboxContext.Provider value={{ closeable: Boolean(onClose) }}>
        {children}
      </HelpboxContext.Provider>
      {onClose && (
        <Button
          className={classes.closeButton}
          circular
          onClick={onClose}
          icon={<Close16 color='dark-grey' />}
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

export default withStyles(styles)(Helpbox) as PicassoComponentWithRef<
  Props,
  HTMLDivElement,
  StaticProps
>
