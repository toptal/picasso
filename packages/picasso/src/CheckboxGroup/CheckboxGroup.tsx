import React, { FunctionComponent } from 'react'
import FormGroup, { FormGroupProps } from '@material-ui/core/FormGroup'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props extends FormGroupProps {
  /** Align checkboxes horizontally  */
  horizontal?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoCheckboxGroup'
})

const CheckboxGroup: FunctionComponent<Props> = props => {
  const { horizontal, className, ...rest } = props

  const {
    horizontal: horizontalClass,
    vertical: verticalClass,
    ...classes
  } = useStyles()

  return (
    <FormGroup
      {...rest}
      classes={classes}
      className={cx(
        classes.root,
        { [horizontalClass]: horizontal, [verticalClass]: !horizontal },
        className
      )}
    />
  )
}

CheckboxGroup.defaultProps = {
  horizontal: false
}

export default CheckboxGroup
