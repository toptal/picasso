import type { ReactNode, MouseEvent, ReactElement, HTMLAttributes } from 'react'
import React, { forwardRef, cloneElement } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarContent } from '@material-ui/core'
import cx from 'classnames'
import capitalize from '@material-ui/core/utils/capitalize'
import type { StandardProps } from '@toptal/picasso-shared'
import {
  CloseMinor16,
  ExclamationSolid16,
  ExclamationSolid24,
  CheckSolid24,
  Info24,
} from '@toptal/picasso-icons'
import { Container } from '@toptal/picasso-container'
import { ButtonCircular } from '@toptal/picasso-button'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'

export type VariantType = 'red' | 'green' | 'white' | 'yellow'

export interface PrivateProps
  extends StandardProps,
    HTMLAttributes<HTMLDivElement> {
  /** Main content of the Notification */
  children: ReactNode
  /** Callback invoked when close button is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Style variant of Notification */
  variant?: VariantType
  /** Add <Icon /> before Notification content  */
  icon?: ReactElement
  /** Enable elevated appearance for Notification */
  elevated?: boolean
  testIds?: {
    closeButton?: string
    notification?: string
    content?: string
  }
}

/** `elevated` and `icon` props are omitted from the public declaration, since they're only for internal use */
export type PublicProps = Omit<PrivateProps, 'elevated' | 'icon'>

const renderNotificationCloseButton = ({ onClose, testIds }: PrivateProps) => (
  <ButtonCircular
    data-testid={testIds?.closeButton}
    onClick={onClose}
    // TODO: [FX-5219] need to avoid such customization
    className='absolute right-[0.5em] top-[0.75em] bg-transparent border-none p-0 h-[1em] hover:bg-transparent active:bg-transparent'
    icon={<CloseMinor16 color='darkGrey' />}
  />
)

const renderNotificationIcon = ({ icon, variant, classes }: PrivateProps) => {
  const iconProps = {
    className: classes?.icon,
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
  const { classes, children, onClose, variant, testIds } = props

  const capitalizedVariant = capitalize(variant as string)

  return (
    <Container
      flex
      className={classes?.contentWrapper}
      data-testid={testIds?.content}
    >
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
        size={variant === 'yellow' ? 'small' : 'medium'}
        color='black'
        className={cx(
          'break-words min-w-0',
          variant === 'yellow' ? '!mt-0' : '!mt-[1px]'
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
  name: 'Notification',
})

export const Notification = forwardRef<HTMLElement, PrivateProps>(
  function Notification(props, ref) {
    const {
      className,
      variant,
      elevated,
      testIds,
      'data-testid': dataTestId,
      ...rest
    } = props

    const classes = useStyles()

    return (
      <SnackbarContent
        {...rest}
        className={cx(
          classes[`notification${capitalize(variant as string)}`],
          {
            [classes.notificationShadow]: elevated,
            [classes.roundedBorders]: elevated,
          },
          classes.notification,
          className
        )}
        data-testid={dataTestId || testIds?.notification}
        message={renderNotificationContent({
          ...props,
          classes,
        })}
        ref={ref}
      />
    )
  }
)

Notification.defaultProps = {
  elevated: false,
  variant: 'yellow',
}

Notification.displayName = 'Notification'

export default Notification
