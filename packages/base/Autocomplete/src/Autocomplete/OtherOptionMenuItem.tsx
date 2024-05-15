import type { ReactNode } from 'react'
import React from 'react'
import { Typography } from '@toptal/picasso-typography'
import { MenuItem } from '@toptal/picasso-menu'

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
  return (
    <MenuItem
      key='other-option'
      // TODO replace border-[0] with border-0 after rebase
      className={`px-4 border-gray-400 border-solid border-[0] border-t`}
      {...rest}
      titleCase={false}
    >
      {renderOtherOption ? (
        renderOtherOption(value)
      ) : (
        <>
          <Typography as='span' size='small' color='black'>
            <Typography as='span' color='dark-grey'>
              {otherOptionText}
            </Typography>
            {value}
          </Typography>
        </>
      )}
    </MenuItem>
  )
}

OtherOptionMenuItem.displayName = 'OtherOptionMenuItem'

export default OtherOptionMenuItem
