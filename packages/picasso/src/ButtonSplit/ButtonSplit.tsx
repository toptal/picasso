import React, { forwardRef, ReactNode, MouseEvent, FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'

import {
  ArrowDownMinor24,
  ArrowDownMinor16,
  ArrowUpMinor24,
  ArrowUpMinor16
} from '../Icon'
import Button, { ButtonProps } from '../Button'
import Dropdown from '../Dropdown'
import styles from './styles'

export interface Props extends Omit<ButtonProps, 'children'> {
  /** Content of Button component */
  text: ReactNode
  /** Content element that opens when anchor is clicked */
  menu: ReactNode
  /** Callback invoked when component is clicked */
  onClick?: ButtonProps['onClick']
  /** A button can have different sizes */
  size?: ButtonProps['size']
  /** The variant to use */
  variant?: 'primary' | 'secondary'

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
  isOpen
}: {
  size: SizeType<'small' | 'medium' | 'large'>
  isOpen: boolean
}) => {
  let icon = <ArrowUpMinor16 /> // to make tsc happy

  if (size === 'large' && isOpen) {
    icon = <ArrowUpMinor24 />
  }

  if (size === 'large' && !isOpen) {
    icon = <ArrowDownMinor24 />
  }

  if (size !== 'large' && isOpen) {
    icon = <ArrowUpMinor16 />
  }

  if (size !== 'large' && !isOpen) {
    icon = <ArrowDownMinor16 />
  }

  return icon
}

const StopPropagation: FC = ({ children }) => {
  const handleClick = (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    event.stopPropagation()
  }

  return <span onClick={handleClick}>{children}</span>
}

export const ButtonSplit = forwardRef<HTMLSpanElement, Props>(
  function ButtonSplit (props, ref) {
    // TODO: for consistency. check in clean code, how to name variables (isOpen vs opened, typescript understand the type)
    const {
      size = 'medium',
      menu,
      text,
      variant = 'primary',
      disabled,
      style,
      className,
      menuButtonProps,
      actionButtonProps,
      testIds = {},
      ...rest
    } = props
    const classes = useStyles()

    const commonClasses = cx(classes.button, {
      [classes.primaryVariant]: variant === 'primary',
      [classes.secondaryVariant]: variant === 'secondary',
      [classes.disabled]: disabled
    })

    const renderMenuButton = ({ isOpen }: { isOpen: boolean }) => {
      return (
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
          <DropdownIcon isOpen={isOpen} size={size} />
        </Button>
      )
    }

    return (
      <span
        {...rest}
        className={cx(classes.root, className)}
        style={style}
        ref={ref}
      >
        <Button
          {...actionButtonProps}
          className={`${commonClasses} ${classes.actionButton}`}
          size={size}
          variant={variant}
          disabled={disabled}
          data-testid={testIds.actionButton}
        >
          {text}
        </Button>
        <Dropdown
          content={menu}
          className={cx(classes.dropdown, {
            [classes.disabled]: disabled
          })}
        >
          {({ isOpen }: { isOpen: boolean }) =>
            disabled ? (
              <StopPropagation>{renderMenuButton({ isOpen })}</StopPropagation>
            ) : (
              renderMenuButton({ isOpen })
            )
          }
        </Dropdown>
      </span>
    )
  }
)

ButtonSplit.defaultProps = {
  size: 'medium',
  variant: 'primary'
}

ButtonSplit.displayName = 'PicassoButtonSplit'

export default ButtonSplit
