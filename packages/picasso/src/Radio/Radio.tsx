import React, { forwardRef, ReactNode } from 'react'
import MUIRadio from '@material-ui/core/Radio'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  PicassoComponentWithRef,
  CompoundedComponentWithRef,
  BaseProps,
  ButtonOrAnchorProps,
  TextLabelProps
} from '@toptal/picasso-shared'
import cx from 'classnames'

import RadioGroup from '../RadioGroup'
import FormControlLabel from '../FormControlLabel'
import styles from './styles'

export interface Props
  extends BaseProps,
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
  onChange?: (event: object, checked: boolean) => void
}

// should be moved to some global interfaces place
export interface StaticProps {
  Group: typeof RadioGroup
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'Radio'
})

// eslint-disable-next-line react/display-name
export const Radio = forwardRef<HTMLButtonElement, Props>(function Radio(
  props,
  ref
) {
  const classes = useStyles(props)
  const {
    className,
    style,
    label,
    checked,
    disabled,
    value,
    onChange,
    titleCase,
    ...rest
  } = props

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
      data-testid='trigger'
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
  disabled: false
}

Radio.displayName = 'Radio'

Radio.Group = RadioGroup

export default Radio as PicassoComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
