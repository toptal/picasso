import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  Fragment,
  ReactElement,
  cloneElement
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import cx from 'classnames'
import { capitalize } from 'lodash'

import { Close, Alert } from '../Icon'
import { StandardProps } from '../Picasso'
import Container from '../Container'
import Button from '../Button'
import styles from './styles'

type VariantType = 'error' | 'success' | 'info' | 'warning'

interface Props extends StandardProps {
  /** Main content of the Notification */
  children: ReactNode
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Style variant of Notification */
  variant: VariantType
  /** Add an `<Icon />` before Notification content  */
  icon: ReactElement
  /** Enable Box shadow for Notification */
  shadow?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
}

const renderNotificationCloseButton = ({
  onClose,
  classes: { close, closeIcon }
}: Props) => (
  <Button
    circular
    onClick={onClose}
    className={close}
    title='Close Notification'
    icon={<Close className={closeIcon} size={0.8} />}
  />
)

const renderNotificationIcon = ({ icon, variant, classes }: Props) =>
  cloneElement(icon, {
    className: cx(classes.icon, classes[`icon${capitalize(variant)}`]),
    size: 1.25
  })

const renderNotificationContent = (props: Props) => {
  const {
    classes: { iconWrapper, content, contentCloseButton },
    children,
    onClose
  } = props

  return (
    <Fragment>
      <Container className={iconWrapper}>
        {renderNotificationIcon(props)}
      </Container>
      <Container
        className={cx(content, {
          [contentCloseButton]: onClose
        })}
      >
        {children}
      </Container>
      {onClose && renderNotificationCloseButton(props)}
    </Fragment>
  )
}

export const Notification: FunctionComponent<Props> = props => {
  const { className, classes, variant, shadow, fullWidth } = props

  return (
    <SnackbarContent
      className={cx(
        classes[`notification${capitalize(variant)}`],
        {
          [classes.notificationShadow]: shadow,
          [classes.notificationFullWidth]: fullWidth
        },
        classes.notification,
        className
      )}
      message={renderNotificationContent(props)}
    />
  )
}

Notification.defaultProps = {
  fullWidth: false,
  icon: <Alert />,
  shadow: false,
  variant: 'info'
}

Notification.displayName = 'Notification'

export default withStyles(styles)(Notification)
