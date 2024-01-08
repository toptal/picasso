import type { JssProps } from '@toptal/picasso-shared'
import type { ReactNode } from 'react'
import React from 'react'
import { Typography } from '@toptal/picasso-typography'

import { MenuCompound as Menu } from '../MenuCompound'

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
