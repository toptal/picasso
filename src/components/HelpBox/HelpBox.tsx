import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps, PicassoComponent } from '../Picasso'
import { palette } from '../utils'
import styles from './styles'
import Container from '../Container'
import HelpboxTitle from '../HelpboxTitle'
import HelpboxContent from '../HelpboxContent'
import HelpboxActions from '../HelpboxActions'
import { Close16 } from '../Icon'
import Button from '../Button'
import { HelpboxContextProps } from './types'

type VariantType = 'red' | 'green' | 'white' | 'yellow' | 'blue'

export interface Props extends StandardProps {
  /** Color variant of Helpbox */
  variant?: VariantType
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
  /** Callback invoked when close is clicked */
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface StaticProps {
  Title: typeof HelpboxTitle
  Content: typeof HelpboxContent
  Actions: typeof HelpboxActions
}

export const HelpboxContext = React.createContext<HelpboxContextProps>(
  {} as HelpboxContextProps
)

export const Helpbox: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  children,
  variant,
  onClose
}) => (
  <Container
    className={cx(classes.root, className)}
    style={style}
    bordered
    variant={variant}
    padded='large'
  >
    <HelpboxContext.Provider value={{ closeable: !!onClose }}>
      {children}
    </HelpboxContext.Provider>
    {onClose && (
      <Button
        className={classes.closeButton}
        circular
        onClick={onClose}
        icon={<Close16 color={palette.grey.dark} />}
      />
    )}
  </Container>
)

Helpbox.defaultProps = {}

Helpbox.Title = HelpboxTitle

Helpbox.Content = HelpboxContent

Helpbox.Actions = HelpboxActions

export default withStyles(styles)(Helpbox) as PicassoComponent<
  Props,
  StaticProps
>
