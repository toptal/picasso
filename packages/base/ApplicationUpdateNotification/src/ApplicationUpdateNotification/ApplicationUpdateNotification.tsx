import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { Close16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'

export interface Props extends BaseProps {
  /** Notification title */
  title?: ReactNode
  /** Notification decription text */
  description?: ReactNode
  /** Actions to be rendered */
  actions?: (onClose?: () => void) => ReactNode
  /** Controls the dismissability of the notification */
  dismissable?: boolean
  /** On close click callback */
  onClose?: () => void
}

export const ApplicationUpdateNotification = forwardRef<HTMLDivElement, Props>(
  function ApplicationUpdateNotification(
    {
      title = 'A New Update is Available',
      description = 'Get performance improvements and bug fixes with this update. Make sure to save any data on this page before updating.',
      onClose = () => {},
      ...props
    },
    ref
  ) {
    const { actions = null, dismissable = false, ...rest } = props

    const notification = (
      <Container flex direction='column' gap='xsmall'>
        <svg
          className='opacity-40 absolute -top-[0.4em] -left-[0.5em] fill-blue-700'
          viewBox='0 0 105 105'
          width='105'
          height='105'
        >
          <path d='M8.364 72.364h32v8h-21.47c.829.99 1.701 1.942 2.614 2.855C29.641 91.353 40.63 96 52.364 96 76.464 96 96 76.463 96 52.364h8.727c0 28.92-23.444 52.363-52.363 52.363A52.192 52.192 0 0116.363 90.39v13.975h-8v-32zM52.364 0a52.192 52.192 0 0136 14.338V.364h8v32h-32v-8l21.469-.001a43.924 43.924 0 00-2.614-2.855c-8.133-8.133-19.12-12.78-30.855-12.78-24.1 0-43.637 19.536-43.637 43.636H0C0 23.444 23.444 0 52.364 0z' />
        </svg>

        <Container
          flex
          direction='row'
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <Typography
            variant='heading'
            size='medium'
            color='inherit'
            className='relative'
          >
            {title}
          </Typography>
          {dismissable && (
            <ButtonCircular
              data-testid='btn-dismiss'
              className='text-lg text-white inline-flex items-center font-semibold whitespace-nowrap'
              variant='transparent'
              icon={<Close16 />}
              onClick={onClose}
            />
          )}
        </Container>

        <Container className='relative'>
          <Typography size='medium' color='inherit'>
            {description}
          </Typography>
        </Container>

        {actions?.(onClose)}
      </Container>
    )

    return (
      <div
        {...rest}
        className='relative flex flex-wrap text-lg/[1.43] items-center rounded-md bg-blue-600 shadow-3 w-[27.5em] text-white p-[1.5em] overflow-hidden'
        ref={ref}
        role='alert'
      >
        {notification}
      </div>
    )
  }
)

ApplicationUpdateNotification.displayName = 'ApplicationUpdateNotification'

export default ApplicationUpdateNotification
