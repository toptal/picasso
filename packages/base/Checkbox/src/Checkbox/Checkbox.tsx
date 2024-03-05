import { Checkbox as MUICheckbox } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type {
  ButtonOrAnchorProps,
  BaseProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import cx from 'classnames'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Container } from '@toptal/picasso-container'
import { FormControlLabel } from '@toptal/picasso-form'
import type { RequiredDecoration } from '@toptal/picasso-form'

import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoCheckbox' })

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Show checkbox as `checked` */
  checked?: boolean
  /** Disable changing `Checkbox` state */
  disabled?: boolean
  /** Checkbox can show indeterminate value instead of boolean */
  indeterminate?: boolean
  /** Text label for the `Checkbox` */
  label?: ReactNode
  /** The id of the input element */
  id?: string
  /** Label's style */
  labelStyle?: CSSProperties
  /** Whether to show asterisk or (optional) postfix for the label as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  /** Callback invoked when `Checkbox` changed its value */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  /** Value of the `Checkbox` (applicable only for controlled component) */
  value?: string
}

export const Checkbox = forwardRef<HTMLButtonElement | HTMLLabelElement, Props>(
  function Checkbox(props, ref) {
    const {
      label,
      id,
      className,
      style,
      labelStyle,
      disabled,
      requiredDecoration,
      onChange,
      value,
      checked,
      indeterminate,
      titleCase,
      ...rest
    } = props

    const classes = useStyles()
    const rootClasses = {
      root: classes.root,
      disabled: classes.disabled,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color, 'data-private': dataPrivate, ...checkboxAttributes } = rest

    const muiCheckbox = (
      <Container as='span' flex inline className={classes.checkboxWrapper}>
        <MUICheckbox
          {...checkboxAttributes}
          ref={
            label ? undefined : (ref as React.ForwardedRef<HTMLButtonElement>)
          }
          checked={checked}
          icon={<div className={classes.uncheckedIcon} />}
          checkedIcon={<div className={classes.checkedIcon} />}
          indeterminateIcon={<div className={classes.indeterminateIcon} />}
          classes={rootClasses}
          className={cx(className, {
            [classes.withLabel]: Boolean(label),
          })}
          style={style}
          disabled={disabled}
          id={id}
          indeterminate={indeterminate}
          onChange={onChange}
          value={value}
          focusVisibleClassName={classes.focused}
        />
      </Container>
    )

    if (!label) {
      return muiCheckbox
    }

    const externalEventListeners = {
      onMouseLeave: rest.onMouseLeave,
      onMouseOver: rest.onMouseOver,
    } as ComponentProps<typeof FormControlLabel>

    return (
      <FormControlLabel
        {...externalEventListeners}
        style={labelStyle}
        ref={ref as React.ForwardedRef<HTMLLabelElement>}
        classes={{
          ...rootClasses,
          label: classes.label,
        }}
        control={muiCheckbox}
        requiredDecoration={requiredDecoration}
        disabled={disabled}
        label={label}
        titleCase={titleCase}
        className='picasso-checkbox'
        data-private={dataPrivate}
      />
    )
  }
)

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
  onChange: () => {},
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
