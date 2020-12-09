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
import {
  BaseProps,
  JssProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '@toptal/picasso-shared'

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

/** `variant`, `elevated` and `icon` props are omitted from the public declaration, since they're only for internal use */
export interface PrivateProps
  extends BaseProps,
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

export type PublicProps = Omit<PrivateProps, 'variant' | 'icon'>

export interface StaticProps {
  Actions: typeof NotificationActions
}

const renderNotificationCloseButton = ({
  onClose,
  classes: { close, closeIcon }
}: PrivateProps & JssProps) => (
  <Button.Circular
    onClick={onClose}
    className={close}
    title='Close Notification'
    icon={<CloseMinor16 className={closeIcon} />}
  />
)

const renderNotificationIcon = ({
  icon,
  variant,
  classes
}: PrivateProps & JssProps) => {
  const iconProps = {
    className: classes.icon
  }

  // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
  // Missing the following: https://github.com/toptal/picasso/issues/253
  switch (variant) {
    case 'red':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <ExclamationSolid24 {...iconProps} color='red' />

    case 'yellow':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <ExclamationSolid16 {...iconProps} color='yellow' />

    case 'green':
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <CheckSolid24 {...iconProps} color='green' />

    default: {
      const infoProps = { ...iconProps, color: 'grey' as const }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return icon ? cloneElement(icon, infoProps) : <Info24 {...infoProps} />
    }
  }
}

const renderNotificationContent = (props: PrivateProps & JssProps) => {
  const {
    classes: { iconWrapper, content, contentWrapper, contentCloseButton },
    children,
    onClose
  } = props

  return (
    <Container flex className={contentWrapper}>
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
    </Container>
  )
}

const useStyles = makeStyles<Theme, PrivateProps>(styles, {
  name: 'Notification'
})

// eslint-disable-next-line react/display-name
export const Notification = forwardRef<HTMLElement, PrivateProps>(
  function Notification(props, ref) {
    const classes = useStyles(props)
    const { className, variant, elevated, ...rest } = props

    return (
      <SnackbarContent
        // eslint-disable-next-line react/jsx-props-no-spreading
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
) as CompoundedComponentWithRef<PrivateProps, HTMLElement, StaticProps>

Notification.defaultProps = {
  elevated: false,
  variant: 'yellow'
}

Notification.displayName = 'Notification'

Notification.Actions = NotificationActions

export default Notification as PicassoComponentWithRef<
  PublicProps,
  HTMLElement,
  StaticProps
>
