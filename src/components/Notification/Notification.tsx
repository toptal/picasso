import React, {
  FunctionComponent,
  ReactNode,
  MouseEvent,
  ReactElement,
  Fragment,
  cloneElement
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import cx from 'classnames'
import { capitalize } from '@material-ui/core/utils/helpers'

import palette from '../Picasso/config/palette'
import { Close, Alert, Tick, Info } from '../Icon'
import { StandardProps } from '../Picasso'
import Container from '../Container'
import Button from '../Button'
import styles from './styles'
import Typography from '../Typography'

type VariantType = 'error' | 'success' | 'info' | 'warning'

export interface Props extends StandardProps {
  /** Main content of the Notification */
  children: ReactNode
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Style variant of Notification */
  variant?: VariantType
  /** Add <Icon /> before Notification content  */
  icon?: ReactElement
  /** Enable elevated appearance for Notification */
  elevated?: boolean
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

const renderNotificationIcon = ({ icon, variant, classes }: Props) => {
  const iconProps = {
    className: classes.icon,
    size: 1.25
  }

  // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
  // Missing the following: https://github.com/toptal/picasso/issues/253
  switch (variant) {
    case 'error':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Alert {...iconProps} color={palette.error.main} />

    case 'warning':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Alert {...iconProps} color={palette.warning.main} />

    case 'success':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Tick {...iconProps} color={palette.success.main} />

    default:
      const infoProps = { ...iconProps, color: palette.grey[200] }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return icon ? cloneElement(icon, infoProps) : <Info {...infoProps} />
  }
}

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
      <Typography
        className={cx(content, {
          [contentCloseButton]: onClose
        })}
        variant='small'
        as='div'
      >
        {children}
      </Typography>
      {onClose && renderNotificationCloseButton(props)}
    </Fragment>
  )
}

export const Notification: FunctionComponent<Props> = props => {
  const { className, classes, variant, elevated, fullWidth } = props

  return (
    <SnackbarContent
      className={cx(
        classes[`notification${capitalize(variant as string)}`],
        {
          [classes.notificationShadow]: elevated,
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
  elevated: false,
  fullWidth: false,
  variant: 'info'
}

Notification.displayName = 'Notification'

export default withStyles(styles)(Notification)
