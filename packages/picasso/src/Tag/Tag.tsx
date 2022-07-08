import React, {
  forwardRef,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ElementType,
  MouseEvent,
  AnchorHTMLAttributes,
} from 'react'
import { styled } from '@mui/material/styles'
import cx from 'classnames'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'

import Chip from '../Chip'
import '../Chip/styles'
import { CloseMinor16 } from '../Icon'
import toTitleCase from '../utils/to-title-case'

const StyledInnerLabel = styled('span')(() => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  minWidth: 0,
}))

const PREFIX = 'PicassoTag'

const classes = {
  root: `${PREFIX}-root`,
  clickable: `${PREFIX}-clickable`,
  label: `${PREFIX}-label`,
  hovered: `${PREFIX}-hovered`,
  disabled: `${PREFIX}-disabled`,
  checkable: `${PREFIX}-checkable`,
  'light-grey': `${PREFIX}-light-grey`,
  blue: `${PREFIX}-blue`,
  green: `${PREFIX}-green`,
  yellow: `${PREFIX}-yellow`,
  red: `${PREFIX}-red`,
}

const StyledChip = styled(Chip)(({ theme }) => {
  const { palette, transitions } = theme

  return {
    [`&.${classes.root}`]: {
      fontSize: '1rem',
      maxWidth: '100%',
    },
    [`&.${classes.blue}`]: {
      color: palette.blue.main,
      borderColor: palette.blue.main,
    },
    [`&.${classes.green}`]: {
      color: palette.green.dark,
      borderColor: palette.green.dark,
    },
    [`&.${classes.yellow}`]: {
      color: palette.yellow.main,
      borderColor: palette.yellow.main,
    },
    [`&.${classes.red}`]: {
      color: palette.red.main,
      borderColor: palette.red.main,
    },
    [`&.${classes.clickable}`]: {
      cursor: 'default',
      '&:hover, &:focus': {
        backgroundColor: palette.common.white,
        cursor: 'default',
      },
      [`&.${classes.checkable}:not(.${classes.disabled})`]: {
        cursor: 'pointer',
        [`&:hover, &.${classes.hovered}`]: {
          borderColor: palette.grey.dark,
          backgroundColor: palette.common.white,
          transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        },
        '&:focus': {
          backgroundColor: palette.common.white,
        },
        [`&.${classes.green}`]: {
          [`&:hover, &.${classes.hovered}`]: {
            borderColor: palette.red.main,
            color: palette.red.main,
          },
        },
      },
    },
    [`&.${classes.label}`]: {
      gap: '0.5rem',
    },
    [`&.${classes.disabled}`]: {
      borderColor: palette.grey.lighter2,
      color: palette.grey.main,
      pointerEvents: 'none',
    },
    [`&.${classes.hovered}`]: {},
    [`&.${classes.checkable}`]: {},
  }
}) as typeof Chip

const DeleteIcon = styled('span')(() => ({
  width: 'auto',
  height: 'auto',
}))

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>
export interface Props extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Text content of the `Tag` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Tag */
  icon?: ReactElement
  /** Defines if `Tag` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag`
   */
  onDelete?: () => void
  /** Variant of the `Tag` */
  variant?: 'light-grey' | 'blue' | 'green' | 'yellow' | 'red'
  /** ReactNode rendered after label */
  endAdornment?: ReactNode
  hovered?: boolean
}

export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(props, ref) {
  const {
    as = 'div',
    className,
    disabled,
    endAdornment,
    hovered,
    children,
    icon,
    onDelete,
    style,
    titleCase: propsTitleCase,
    variant = 'light-grey',
    ...rest
  } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...htmlAttributes } = rest

  const titleCase = useTitleCase(propsTitleCase)

  const label = (
    <>
      <StyledInnerLabel>
        {titleCase ? toTitleCase(children) : children}
      </StyledInnerLabel>
      {endAdornment}
    </>
  )

  const handleDelete = (event: MouseEvent) => {
    if (disabled) {
      return
    }

    if (onDelete) {
      event.preventDefault()
      onDelete()
    }
  }

  return (
    <StyledChip
      {...htmlAttributes}
      ref={ref}
      classes={{
        root: classes.root,
        label: classes.label,
        clickable: classes.clickable,
      }}
      className={cx(className, classes[variant], {
        [classes.hovered]: hovered,
        [classes.disabled]: disabled,
      })}
      style={style}
      icon={
        icon
          ? React.cloneElement(icon, {
              color: disabled ? 'grey' : 'dark-grey',
            })
          : undefined
      }
      label={label}
      deleteIcon={
        <DeleteIcon aria-label='delete icon' role='button'>
          <CloseMinor16 />
        </DeleteIcon>
      }
      component={as}
      onDelete={onDelete ? handleDelete : undefined}
      aria-disabled={disabled}
    />
  )
})

Tag.defaultProps = {
  as: 'div',
  children: '',
  variant: 'light-grey',
}

Tag.displayName = 'Tag'

export default Tag
