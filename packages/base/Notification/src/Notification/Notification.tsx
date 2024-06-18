import type { ReactNode, MouseEvent, ReactElement, HTMLAttributes } from 'react'
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
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import { capitalize } from '@toptal/picasso-utils'

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
      className='flex w-full my-0 mx-auto p-0 max-w-[75em] min-w-0'
      data-testid={testIds?.content}
    >
      <Container
        flex
        alignItems='center'
        className={twJoin(
          'min-w-[1.5em] mr-[1em]',
          variant === 'yellow'
            ? 'h-[1em] min-w-[1em] mt-[2px] basis-0'
            : 'h-[1.5em] basis-[1.5em]'
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

    const classByVariant: Classes = {
      notificationRed: 'bg-red-100',
      notificationGreen: 'bg-green-100',
      notificationWhite: 'bg-white px-[1.5em] pt-[1.5625em] pb-[1.5em]',
      notificationYellow:
        'bg-yellow-100 px-[1em] py-[1.5em] sm:p-[1.5em] lg:px-[130px] lg:py-[1.5em]',
    }

    return (
      <div
        {...rest}
        className={twMerge(
          'relative w-full flex flex-nowrap items-start shadow-[none] rounded-[none] pt-[1.5em] pb-[1.5625em] pr-[2.5em] pl-[1.5em] transition-shadow duration-300',
          elevated && 'shadow-3 rounded-sm',
          variant
            ? classByVariant[`notification${capitalize(variant)}`]
            : classByVariant.notificationYellow,
          className
        )}
        data-testid={dataTestId || testIds?.notification}
        ref={ref}
        role='alert'
      >
        {renderNotificationContent({
          ...props,
        })}
      </div>
    )
  }
)

Notification.defaultProps = {
  elevated: false,
  variant: 'yellow',
}

Notification.displayName = 'Notification'

export default Notification
