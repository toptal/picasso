import { MenuMode } from '../../types'
import useDrilldownMenu from '../use-drilldown-menu'
import useSliderMenu from '../use-slider-menu'

export interface Props {
  mode?: MenuMode
}

const useMenu = (props: Props) => {
  const { mode } = props
  const slider = useSliderMenu()
  const drilldown = useDrilldownMenu()

  return mode === 'drilldown' ? drilldown : slider
}

export default useMenu
