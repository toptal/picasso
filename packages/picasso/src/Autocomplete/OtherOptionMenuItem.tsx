import { JssProps } from '@toptal/picasso-shared'
import React, { ReactNode } from 'react'

import { MenuCompound as Menu } from '../MenuCompound'
import Typography from '../Typography'

const OtherOptionMenuItem = ({
  value,
  otherOptionText,
  renderOtherOption,
  classes,
  ...rest
}: {
  value: string
  otherOptionText: string
  renderOtherOption?: (value: string) => ReactNode
} & JssProps) => {
  return (
    <Menu.Item
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
