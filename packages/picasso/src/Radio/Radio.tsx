import React, { forwardRef, ReactNode } from 'react'
import MUIRadio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import {
  PicassoComponentWithRef,
  CompoundedComponentWithRef,
  StandardProps,
  ButtonOrAnchorProps
} from '@toptal/picasso-shared'
import cx from 'classnames'

import RadioGroup from '../RadioGroup'
import FormControlLabel from '../FormControlLabel'
import styles from './styles'

export interface Props
  extends StandardProps,
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
  onChange?: (event: object, checked: boolean) => void
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

// should be moved to some global interfaces place
export interface StaticProps {
  Group: typeof RadioGroup
}

// eslint-disable-next-line react/display-name
export const Radio = forwardRef<HTMLButtonElement, Props>(function Radio(
  {
    classes,
    className,
    style,
    label,
    checked,
    disabled,
    value,
    onChange,
    titleCase,
    ...rest
  },
  ref
) {
  const rootClasses = {
    root: classes.root,
    disabled: classes.disabled
  }
  const muiRadio = (
    <MUIRadio
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      value={value}
      icon={<div className={classes.uncheckedIcon} />}
      checkedIcon={<div className={classes.checkedIcon} />}
      color='default'
      classes={rootClasses}
      className={cx(className, {
        [classes.withLabel]: Boolean(label)
      })}
      style={style}
      focusVisibleClassName={classes.focused}
    />
  )

  if (!label) {
    return muiRadio
  }

  return (
    <FormControlLabel
      control={muiRadio}
      className={classes.labelWithRightSpacing}
      classes={{
        ...rootClasses,
        label: classes.label
      }}
      style={style}
      label={label}
      disabled={disabled}
      titleCase={titleCase}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLButtonElement, StaticProps>

Radio.defaultProps = {
  classes: {},
  disabled: false
}

Radio.displayName = 'Radio'

Radio.Group = RadioGroup

export default withStyles(styles)(Radio) as PicassoComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
