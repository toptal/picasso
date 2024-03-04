import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { SnackbarContent } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { Container } from '@toptal/picasso-container'
import { Close16 } from '@toptal/picasso-icons'
import { ButtonCircular } from '@toptal/picasso-button'

import styles from './styles'

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

const useStyles = makeStyles<Theme>(styles, {
  name: 'ApplicationUpdateNotification',
})

export const ApplicationUpdateNotification = forwardRef<HTMLElement, Props>(
  function ApplicationUpdateNotification(props, ref) {
    const {
      title,
      description,
      actions = null,
      dismissable = false,
      onClose,
      ...rest
    } = props
    const classes = useStyles()

    const notification = (
      <Container flex direction='column' gap='xsmall'>
        <svg
          className={classes.icon}
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
            className={classes.positionRelative}
          >
            {title}
          </Typography>
          {dismissable && (
            <ButtonCircular
              data-testid='btn-dismiss'
              className={classes.closeAction}
              variant='transparent'
              icon={<Close16 />}
              onClick={onClose}
            />
          )}
        </Container>

        <Container className={classes.positionRelative}>
          <Typography size='medium' color='inherit'>
            {description}
          </Typography>
        </Container>

        {actions?.(onClose)}
      </Container>
    )

    return (
      <SnackbarContent
        {...rest}
        classes={{
          root: cx([classes.root, classes.positionRelative]),
          message: classes.message,
        }}
        message={notification}
        ref={ref}
      />
    )
  }
)

ApplicationUpdateNotification.defaultProps = {
  title: 'A New Update is Available',
  description:
    'Get performance improvements and bug fixes with this update. Make sure to save any data on this page before updating.',
  onClose: () => {},
}

ApplicationUpdateNotification.displayName = 'ApplicationUpdateNotification'

export default ApplicationUpdateNotification
