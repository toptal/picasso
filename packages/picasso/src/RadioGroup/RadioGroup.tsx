import React, { FunctionComponent } from 'react'
import MUIRadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

export interface Props extends RadioGroupProps {
  /** Align radios horizontally  */
  horizontal?: boolean
}

// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent FormControlLabel's styles to override RadioGroup's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoRadioGroup',
  index: -1
})

const RadioGroup: FunctionComponent<Props> = props => {
  const { horizontal, className, ...rest } = props
  const {
    horizontal: horizontalClass,
    labelWithRightSpacing,
    ...classes
  } = useStyles(props)

  const children = React.Children.toArray(rest.children)

  const childrenWithSpacing = children.map((child, index) => {
    if (!React.isValidElement(child)) return

    if (index === children.length || !horizontal) {
      return child
    }

    return React.cloneElement(child, {
      classes: { ...child.props.classes, labelWithRightSpacing }
    })
  })

  return (
    <MUIRadioGroup
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={classes}
      className={cx({ [horizontalClass]: horizontal }, className)}
    >
      {childrenWithSpacing}
    </MUIRadioGroup>
  )
}

RadioGroup.defaultProps = {
  horizontal: false
}

export default RadioGroup
