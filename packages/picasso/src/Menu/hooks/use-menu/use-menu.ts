import { MenuMode } from '../../types'
import useMenuMode from '../use-menu-mode'
import useDrilldownMenu from '../use-drilldown-menu'
import useSliderMenu from '../use-slider-menu'

export interface Props {
  mode?: MenuMode
}

const useMenu = (props: Props) => {
  const mode = useMenuMode(props)
  const slider = useSliderMenu()
  const drilldown = useDrilldownMenu()

  return mode !== 'drilldown' ? slider : drilldown
}

export default useMenu
