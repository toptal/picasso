import { MenuVariant } from '../../types'
import useMenuVariant from '../use-menu-variant'
import useDrilldownMenu from '../use-drilldown-menu'
import useSlideMenu from '../use-slide-menu'

export interface Props {
  variant?: MenuVariant
}

const useMenu = (props: Props) => {
  const variant = useMenuVariant(props)
  const slide = useSlideMenu()
  const drilldown = useDrilldownMenu()

  return variant !== 'drilldown' ? slide : drilldown
}

export default useMenu
