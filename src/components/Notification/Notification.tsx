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
import {
  Close,
  Exclamation16 as Alert,
  CheckMinor16 as Tick,
  Info16 as Info
} from '../Icon'
import { StandardProps } from '../Picasso'
import Container from '../Container'
import Button from '../Button'
import styles from './styles'
import Typography from '../Typography'

type VariantType = 'red' | 'green' | 'white' | 'yellow'

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
    icon={<Close className={closeIcon} />}
  />
)

const renderNotificationIcon = ({ icon, variant, classes }: Props) => {
  const iconProps = {
    className: classes.icon
  }

  // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
  // Missing the following: https://github.com/toptal/picasso/issues/253
  switch (variant) {
    case 'red':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Alert {...iconProps} color={palette.red.main} />

    case 'yellow':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Alert {...iconProps} color={palette.yellow.main} />

    case 'green':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Tick {...iconProps} color={palette.green.main} />

    default:
      const infoProps = { ...iconProps, color: palette.grey.main }

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
      <Container flex alignItems='center' className={iconWrapper}>
        {renderNotificationIcon(props)}
      </Container>
      <Typography
        size='medium'
        className={cx(content, {
          [contentCloseButton]: onClose
        })}
        as='div'
      >
        {children}
      </Typography>
      {onClose && renderNotificationCloseButton(props)}
    </Fragment>
  )
}

export const Notification: FunctionComponent<Props> = props => {
  const {
    className,
    classes,
    variant,
    elevated,
    fullWidth,
    elementSelector
  } = props

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
      data-qa={elementSelector}
    />
  )
}

Notification.defaultProps = {
  elevated: false,
  fullWidth: false,
  variant: 'white'
}

Notification.displayName = 'Notification'

export default withStyles(styles)(Notification)
