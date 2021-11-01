import React, {
  forwardRef,
  ReactNode,
  MouseEvent,
  ReactElement,
  cloneElement,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import cx from 'classnames'
import capitalize from '@material-ui/core/utils/capitalize'
import { StandardProps } from '@toptal/picasso-shared'

import {
  CloseMinor16,
  ExclamationSolid16,
  ExclamationSolid24,
  CheckSolid24,
  Info24
} from '../Icon'
import Container from '../Container'
import Button from '../Button'
import styles from './styles'
import Typography from '../Typography'
import NotificationActions from '../NotificationActions'

export type VariantType = 'red' | 'green' | 'white' | 'yellow'

export interface PrivateProps
  extends StandardProps,
    HTMLAttributes<HTMLDivElement> {
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
}

/** `elevated` and `icon` props are omitted from the public declaration, since they're only for internal use */
export type PublicProps = Omit<PrivateProps, 'elevated' | 'icon'>

const renderNotificationCloseButton = ({ onClose, classes }: PrivateProps) => (
  <Button.Circular
    onClick={onClose}
    className={classes?.close}
    icon={<CloseMinor16 className={classes?.closeIcon} />}
  />
)

const renderNotificationIcon = ({ icon, variant, classes }: PrivateProps) => {
  const iconProps = {
    className: classes?.icon
  }

  // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
  // Missing the following: https://github.com/toptal/picasso/issues/253
  switch (variant) {
    case 'red':
      return <ExclamationSolid24 {...iconProps} color='red' />

    case 'yellow':
      return <ExclamationSolid16 {...iconProps} color='yellow' />

    case 'green':
      return <CheckSolid24 {...iconProps} color='green' />

    default: {
      const infoProps = { ...iconProps, color: 'grey' as const }

      return icon ? cloneElement(icon, infoProps) : <Info24 {...infoProps} />
    }
  }
}

const renderNotificationContent = (props: PrivateProps) => {
  const { classes, children, onClose, variant } = props

  const capitalizedVariant = capitalize(variant as string)

  return (
    <Container flex className={classes?.contentWrapper}>
      <Container
        flex
        alignItems='center'
        className={cx(
          classes?.iconWrapper,
          classes?.[`iconWrapper${capitalizedVariant}`]
        )}
      >
        {renderNotificationIcon(props)}
      </Container>
      <Typography
        size='medium'
        className={cx(
          classes?.content,
          classes?.[`content${capitalizedVariant}`]
        )}
        as='div'
      >
        {children}
      </Typography>
      {onClose && renderNotificationCloseButton(props)}
    </Container>
  )
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Notification'
})

export const Notification = forwardRef<HTMLElement, PrivateProps>(
  function Notification(props, ref) {
    const { className, variant, elevated, ...rest } = props

    const classes = useStyles()

    return (
      <SnackbarContent
        {...rest}
        className={cx(
          classes[`notification${capitalize(variant as string)}`],
          {
            [classes.notificationShadow]: elevated,
            [classes.roundedBorders]: elevated
          },
          classes.notification,
          className
        )}
        message={renderNotificationContent({
          ...props,
          classes
        })}
        ref={ref}
      />
    )
  }
)

Notification.defaultProps = {
  elevated: false,
  variant: 'yellow'
}

Notification.displayName = 'Notification'

export default Object.assign(Notification, { Actions: NotificationActions })
