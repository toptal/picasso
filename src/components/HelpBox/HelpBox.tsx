import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps, PicassoComponent } from '../Picasso'
import styles from './styles'
import Container from '../Container'
import HelpboxTitle from '../HelpboxTitle'
import HelpboxContent from '../HelpboxContent'
import HelpboxActions from '../HelpboxActions'

type VariantType = 'red' | 'green' | 'white' | 'yellow' | 'blue'

export interface Props extends StandardProps {
  /** Color variant of Helpbox */
  variant?: VariantType
  /** Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) */
  children: ReactNode
}

interface StaticProps {
  Title: typeof HelpboxTitle
  Content: typeof HelpboxContent
  Actions: typeof HelpboxActions
}

export const Helpbox: FunctionComponent<Props> & StaticProps = ({
  classes,
  className,
  style,
  children,
  variant
}) => (
  <Container
    className={cx(classes.root, className)}
    style={style}
    bordered
    variant={variant}
    padded='large'
  >
    {children}
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
