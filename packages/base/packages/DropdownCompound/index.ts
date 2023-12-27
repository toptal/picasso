/* eslint-disable import/no-extraneous-dependencies */
import Dropdown from '@toptal/picasso-dropdown'
import { useDropdownContext } from '@toptal/picasso-dropdown/-dropdown'
import DropdownArrow from '@toptal/picasso-dropdown-arrow'

export const DropdownCompound = Object.assign(Dropdown, {
  Arrow: DropdownArrow,
  useContext: useDropdownContext,
})
