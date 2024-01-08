import Dropdown from '../Dropdown'
import { useDropdownContext } from '../Dropdown/Dropdown'
import DropdownArrow from '../DropdownArrow'

export const DropdownCompound = Object.assign(Dropdown, {
  Arrow: DropdownArrow,
  useContext: useDropdownContext,
})
