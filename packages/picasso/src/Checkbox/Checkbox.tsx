import MUICheckbox from '@material-ui/core/Checkbox'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  BaseProps,
  ButtonOrAnchorProps,
  CompoundedComponentWithRef,
  TextLabelProps
} from '@toptal/picasso-shared'
import cx from 'classnames'
import React, { forwardRef, ReactNode } from 'react'

import { RequiredDecoration } from '../FormLabel'
import CheckboxGroup from '../CheckboxGroup'
import Container from '../Container'
import FormControlLabel from '../FormControlLabel'
import styles from './styles'

export interface StaticProps {
  Group: typeof CheckboxGroup
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoCheckbox' })

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<ButtonOrAnchorProps, 'onChange'> {
  /** Show checkbox initially as checked */
  checked?: boolean
  /** Disable changing `Checkbox` state */
  disabled?: boolean
  /** Checkbox can show indeterminate value instead of boolean */
  indeterminate?: boolean
  /** Text label for the `Checkbox` */
  label?: ReactNode
  /** The id of the input element */
  id?: string
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

export const Checkbox = forwardRef<HTMLButtonElement, Props>(function Checkbox(
  props,
  ref
) {
  const {
    label,
    id,
    className,
    style,
    disabled,
    requiredDecoration,
    onChange,
    value,
    checked,
    indeterminate,
    titleCase,
    ...rest
  } = props

  const classes = useStyles(props)
  const rootClasses = {
    root: classes.root,
    disabled: classes.disabled
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...checkboxAttributes } = rest

  const muiCheckbox = (
    <Container as='span' flex inline className={classes.checkboxWrapper}>
      <MUICheckbox
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...checkboxAttributes}
        ref={ref}
        checked={checked}
        icon={<div className={classes.uncheckedIcon} />}
        checkedIcon={<div className={classes.checkedIcon} />}
        indeterminateIcon={<div className={classes.indeterminateIcon} />}
        classes={rootClasses}
        className={cx(className, {
          [classes.withLabel]: Boolean(label)
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

  return (
    <FormControlLabel
      classes={{
        ...rootClasses,
        label: classes.label
      }}
      control={muiCheckbox}
      requiredDecoration={requiredDecoration}
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      className='picasso-checkbox'
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLButtonElement, StaticProps>

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
  onChange: () => {}
}

Checkbox.displayName = 'Checkbox'

Checkbox.Group = CheckboxGroup

export default Checkbox
