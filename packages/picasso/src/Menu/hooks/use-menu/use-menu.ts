import useMenuContext from '../use-menu-context'
import useSliderMenu from '../use-slider-menu'

const useMenu = () => {
  const {
    menu,
    hasBackButton,
    onItemClick,
    onItemUpdate,
    onBackClick
  } = useSliderMenu()
  const context = useMenuContext({ onItemClick, onItemUpdate, onBackClick })

  return { menu, context, hasBackButton }
}

export default useMenu
