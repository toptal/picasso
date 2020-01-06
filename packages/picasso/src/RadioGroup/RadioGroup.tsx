import React, { FunctionComponent } from 'react'
import MUIRadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props extends RadioGroupProps {
  /** Align radios horizontally  */
  horizontal?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoRadioGroup'
})

const RadioGroup: FunctionComponent<Props> = props => {
  const { horizontal, className, ...rest } = props
  const { horizontal: horizontalClass, ...classes } = useStyles(props)

  return (
    <MUIRadioGroup
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={classes}
      className={cx({ [horizontalClass]: horizontal }, className)}
    />
  )
}

RadioGroup.defaultProps = {
  horizontal: false
}

export default RadioGroup
