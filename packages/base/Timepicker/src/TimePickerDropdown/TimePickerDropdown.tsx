import React from 'react'
import { Popper } from '@toptal/picasso-popper'
import { ClickAwayListener } from '@toptal/picasso-utils'

import { TimePickerList } from '../TimePickerList'
import type { TimePickerListProps } from '../TimePickerList'

export interface Props extends TimePickerListProps {
  /** Whether the dropdown is shown */
  open: boolean
  /** Element the dropdown is positioned under */
  anchorEl: HTMLElement | null
  /** Called when a click lands outside of the dropdown */
  onClickAway: (event: React.MouseEvent) => void
}

export const TimePickerDropdown = ({
  open,
  anchorEl,
  onClickAway,
  ...rest
}: Props) => {
  if (!open || !anchorEl) {
    return null
  }

  return (
    <Popper
      open
      role='presentation'
      anchorEl={anchorEl}
      placement='bottom-start'
    >
      <ClickAwayListener onClickAway={onClickAway}>
        <div>
          <TimePickerList {...rest} />
        </div>
      </ClickAwayListener>
    </Popper>
  )
}

TimePickerDropdown.displayName = 'TimePickerDropdown'

export default TimePickerDropdown
