import React, {
  forwardRef,
  ReactNode,
  MouseEvent,
  FC,
  HTMLAttributes
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { SizeType, BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import { ArrowDownMinor24, ArrowDownMinor16 } from '../Icon'
import Button, { ButtonProps } from '../Button'
import Dropdown from '../Dropdown'
import styles from './styles'

export interface Props
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Content of Button component */
  children: ReactNode
  /** Content element that opens when anchor is clicked */
  menu: ReactNode
  /** Callback invoked when component is clicked */
  onClick?: ButtonProps['onClick']
  /** A button can have different sizes */
  size?: ButtonProps['size']
  /** The variant to use */
  variant?: 'primary' | 'secondary'
  /** Is component disaled or not */
  disabled?: boolean
  // Internal props
  menuButtonProps?: Omit<ButtonProps, 'children'>
  actionButtonProps?: Omit<ButtonProps, 'children'>
  testIds?: {
    actionButton?: string
    menuButton?: string
  }
}
// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent Button's styles to override ButtonSplit's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonSplit',
  index: -1
})

const DropdownIcon = ({
  size,
  className
}: {
  size: SizeType<'small' | 'medium' | 'large'>
  className?: string
}) => {
  if (size === 'large') {
    return <ArrowDownMinor24 className={className} />
  }

  return <ArrowDownMinor16 className={className} />
}

const EventStopPropagation: FC = ({ children }) => {
  const handleClick = (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    event.stopPropagation()
  }

  return <span onClick={handleClick}>{children}</span>
}

export const ButtonSplit = forwardRef<HTMLDivElement, Props>(
  function ButtonSplit(props, ref) {
    const {
      size = 'medium',
      menu,
      children,
      variant = 'primary',
      disabled,
      style,
      className,
      onClick,
      menuButtonProps,
      actionButtonProps,
      testIds = {},
      ...rest
    } = props
    const classes = useStyles()

    const commonClasses = cx(classes.button, {
      [classes.primaryVariant]: variant === 'primary',
      [classes.disabled]: disabled
    })

    const renderMenuButton = ({
      isOpen,
      disabled
    }: {
      isOpen: boolean
      disabled?: boolean
    }) => {
      const menuButton = (
        <Button
          {...menuButtonProps}
          variant={variant}
          className={`${commonClasses} ${classes.menuButton} ${
            classes[`${size}Size`]
          }`}
          size={size}
          disabled={disabled}
          data-testid={testIds.menuButton}
        >
          <DropdownIcon
            className={cx({
              [classes.rotated]: isOpen
            })}
            size={size}
          />
        </Button>
      )

      return disabled ? (
        <EventStopPropagation>{menuButton}</EventStopPropagation>
      ) : (
        menuButton
      )
    }

    return (
      <Button.Group {...rest} ref={ref} style={style} className={className}>
        <Button
          {...actionButtonProps}
          className={`${commonClasses} ${classes.actionButton}`}
          size={size}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
          data-testid={testIds.actionButton}
        >
          {children}
        </Button>
        <Dropdown
          content={menu}
          className={cx(classes.dropdown, {
            [classes.disabled]: disabled
          })}
        >
          {({ isOpen }: { isOpen: boolean }) =>
            renderMenuButton({ isOpen, disabled })
          }
        </Dropdown>
      </Button.Group>
    )
  }
)

ButtonSplit.defaultProps = {
  size: 'medium',
  variant: 'primary'
}

ButtonSplit.displayName = 'ButtonSplit'

export default ButtonSplit
