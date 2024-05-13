import type {
  ReactNode,
  ReactElement,
  HTMLAttributes,
  SyntheticEvent,
} from 'react'
import React, { forwardRef, cloneElement } from 'react'
import type { Classes, StandardProps } from '@toptal/picasso-shared'
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
import { Snackbar } from '@mui/base'
import { twJoin, twMerge } from 'tailwind-merge'

import { capitalizeFirst } from './utils'

export type VariantType = 'red' | 'green' | 'white' | 'yellow'

export interface PrivateProps
  extends StandardProps,
    HTMLAttributes<HTMLDivElement> {
  /** Main content of the Notification */
  children: ReactNode
  /** Callback invoked when close button is clicked */
  onClose?: (
    event: Event | SyntheticEvent<HTMLButtonElement, Event> | null
  ) => void
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

const renderNotificationIcon = ({ icon, variant = 'yellow' }: PrivateProps) => {
  // TODO: these are Icons required circular Icon bg color definitions, all Icons should be white on that color
  // Missing the following: https://github.com/toptal/picasso/issues/253
  switch (variant) {
    case 'red':
      return <ExclamationSolid24 color='red' />

    case 'yellow':
      return <ExclamationSolid16 color='yellow' />

    case 'green':
      return <CheckSolid24 color='green' />

    default: {
      const infoProps = { color: 'grey' as const }

      return icon ? cloneElement(icon, infoProps) : <Info24 {...infoProps} />
    }
  }
}

const renderNotificationContent = (props: PrivateProps) => {
  const { children, onClose, variant, testIds } = props

  return (
    <Container
      flex
      className='flex w-full my-0 mx-auto p-0 max-w-[75em] min-w-[0]'
      data-testid={testIds?.content}
    >
      <Container
        flex
        alignItems='center'
        className={twMerge(
          'h-[1.5em] min-w-[1.5em] mr-[1em] basis-[1.5em]',
          variant === 'yellow' && 'h-[1em] min-w-[1em] mt-[2px] basis-0'
        )}
      >
        {renderNotificationIcon(props)}
      </Container>
      <Typography
        size={variant === 'yellow' ? 'small' : 'medium'}
        color='black'
        className={twJoin(
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

export const Notification = forwardRef<HTMLDivElement, PrivateProps>(
  function Notification(props, ref) {
    const {
      className,
      variant,
      elevated,
      testIds,
      'data-testid': dataTestId,
      ...rest
    } = props

    const variantClasses: Classes = {
      notificationRed: 'bg-red-100',
      notificationGreen: 'bg-green-100',
      notificationWhite: 'bg-white px-[1.5em] pt-[1.5625em] pb-[1.5em]',
      notificationYellow:
        'bg-yellow-100 px-[1em] py-[1.5em] md:p-[1.5em] xl:px-[130px] xl:py-[1.5em]',
    }

    return (
      <Snackbar
        {...rest}
        open
        className={twMerge(
          variant
            ? variantClasses[`notification${capitalizeFirst(variant)}`]
            : variantClasses.notificationYellow,
          elevated && 'shadow-3 rounded-sm',
          'relative w-full flex flex-nowrap items-start shadow-[none] rounded-[none] pt-[1.5em] pb-[1.5625em] pr-[2.5em] pl-[1.5em] transition-shadow duration-300',
          className
        )}
        data-testid={dataTestId || testIds?.notification}
        ref={ref}
      >
        {renderNotificationContent({
          ...props,
        })}
      </Snackbar>
    )
  }
)

Notification.defaultProps = {
  elevated: false,
  variant: 'yellow',
}

Notification.displayName = 'Notification'

export default Notification
