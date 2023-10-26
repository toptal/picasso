import type { PopperOptions } from 'popper.js'

export const DEFAULT_DATE_PICKER_EDIT_DATE_FORMAT = 'MM-dd-yyyy'
export const DEFAULT_DATE_PICKER_DISPLAY_DATE_FORMAT = 'MMM d, yyyy'
export const POPPER_OPTIONS: PopperOptions = {
  modifiers: {
    hide: {
      enabled: false,
    },
    preventOverflow: {
      enabled: true,
      boundariesElement: 'viewport',
    },
  },
}
