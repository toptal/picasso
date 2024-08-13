import type { ComponentProps, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Radio as MUIRadio } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type {
  StandardProps,
  ButtonOrAnchorProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import cx from 'classnames'
import { FormControlLabel } from '@toptal/picasso-form'

import styles from './styles'

export interface Props
  extends StandardProps,
    TextLabelProps,
    Omit<ButtonOrAnchorProps, 'onChange' | 'value'> {
  /** Text label for the `Radio` */
  label?: ReactNode
  /** Value of the `Radio` component used with conjunction of `Radio.Group` */
  value?: string | number | boolean
  /** Defines if `Radio` is disabled */
  disabled?: boolean
  /** Defines if `Radio` is checked by default */
  checked?: boolean
  /** Callback invoked when `Radio` changes its state */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Radio',
})

// eslint-disable-next-line react/display-name
export const Radio = forwardRef<HTMLButtonElement | HTMLLabelElement, Props>(
  function Radio(props, ref) {
    const {
      className,
      style,
      label,
      checked,
      disabled,
      value,
      onChange,
      titleCase,
      'data-private': dataPrivate,
      ...rest
    } = props
    const classes = useStyles(props)
    const rootClasses = {
      root: classes.root,
      disabled: classes.disabled,
    }
    const muiRadio = (
      <MUIRadio
        {...rest}
        ref={label ? undefined : (ref as React.ForwardedRef<HTMLButtonElement>)}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        value={value}
        icon={<div className={classes.uncheckedIcon} />}
        checkedIcon={<div className={classes.checkedIcon} />}
        color='default'
        classes={rootClasses}
        className={cx(className, {
          [classes.withLabel]: Boolean(label),
        })}
        style={style}
        focusVisibleClassName={classes.focused}
      />
    )

    if (!label) {
      return muiRadio
    }

    const externalEventListeners = {
      onMouseLeave: rest.onMouseLeave,
      onMouseOver: rest.onMouseOver,
    } as ComponentProps<typeof FormControlLabel>

    return (
      <FormControlLabel
        {...externalEventListeners}
        ref={ref as React.ForwardedRef<HTMLLabelElement>}
        control={muiRadio}
        classes={{
          label: 'mt-[0.25em] max-w-[calc(100%_-_1.5em_+_1px)]',
          root: 'text-[1rem] items-start',
        }}
        style={style}
        label={label}
        data-private={dataPrivate}
        disabled={disabled}
        titleCase={titleCase}
      />
    )
  }
)

Radio.defaultProps = {
  disabled: false,
}

Radio.displayName = 'Radio'

export default Radio
