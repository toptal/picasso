import React, { forwardRef, ReactNode, HTMLAttributes, MouseEvent } from 'react'
import cx from 'classnames'
import { StandardProps, JssProps, mergeClasses } from '@toptal/picasso-shared'
import { capitalize, makeStyles, Theme } from '@material-ui/core'
import {
  CloseMinor16,
  Exclamation16 as AlertIcon,
  Done16 as Tick,
  Info16 as Info
} from '@toptal/picasso/Icon'
import { Button, Container, Typography } from '@toptal/picasso'

import styles from './styles'

export type VariantType = 'red' | 'green' | 'blue' | 'yellow'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Main content of the Alert */
  children?: ReactNode
  /** Callback invoked when close is clicked */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Style variant of Alert */
  variant?: VariantType
}

const renderAlertIcon = (props: Props & JssProps) => {
  const {
    variant,
    classes: { icon }
  } = props

  switch (variant) {
    case 'red':
      return <AlertIcon color='red' className={icon} />

    case 'green':
      return <Tick color='green' className={icon} />

    case 'blue':
      return <Info color='light-blue' className={icon} />

    case 'yellow':
      return <AlertIcon color='yellow' className={icon} />
  }
}

const renderAlertCloseButton = ({
  onClose,
  classes: { close, closeIcon }
}: Props & JssProps) => (
  <Button
    circular
    onClick={onClose}
    className={close}
    title='Close alert'
    icon={<CloseMinor16 className={closeIcon} />}
  />
)

const renderAlertContent = (props: Props & JssProps) => {
  const {
    children,
    onClose,
    classes: { content, contentWithCloseButton, iconWrapper }
  } = props

  return (
    <>
      <Container flex alignItems='center' className={iconWrapper}>
        {renderAlertIcon(props)}
      </Container>
      <Typography
        size='medium'
        as='div'
        color='black'
        className={cx(content, {
          [contentWithCloseButton]: onClose
        })}
      >
        {children}
      </Typography>
      {onClose && renderAlertCloseButton(props)}
    </>
  )
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Alert'
})

export const Alert = forwardRef<HTMLDivElement, Props>(function Alert(
  props,
  ref
) {
  const { variant, className, classes: externalClasses } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <Container
      flex
      className={cx(
        classes[`alert${capitalize(variant as string)}`],
        classes.alert,
        className
      )}
      role='alert'
      ref={ref}
    >
      {renderAlertContent({ ...props, classes })}
    </Container>
  )
})

Alert.defaultProps = {
  variant: 'yellow'
}

Alert.displayName = 'Alert'

export default Alert
