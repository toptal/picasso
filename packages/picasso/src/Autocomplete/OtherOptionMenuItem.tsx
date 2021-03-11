import React, { ReactNode } from 'react'

import Menu from '../Menu'
import Typography from '../Typography'
import { useStyles } from './Autocomplete'

const OtherOptionMenuItem = ({
  value,
  otherOptionText,
  renderOtherOption,
  ...rest
}: {
  value: string
  otherOptionText: string
  renderOtherOption?: (value: string) => ReactNode
}) => {
  const classes = useStyles()

  return (
    <Menu.Item
      size='medium'
      key='other-option'
      className={`${classes.option} ${classes.otherOption}`}
      {...rest}
      titleCase={false}
    >
      {renderOtherOption ? (
        renderOtherOption(value)
      ) : (
        <span className={classes.stringContent}>
          <Typography as='span' color='dark-grey'>
            {otherOptionText}
          </Typography>
          {value}
        </span>
      )}
    </Menu.Item>
  )
}

OtherOptionMenuItem.displayName = 'OtherOptionMenuItem'

export default OtherOptionMenuItem
