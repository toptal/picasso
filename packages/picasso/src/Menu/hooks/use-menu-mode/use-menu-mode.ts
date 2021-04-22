import { useContext } from 'react'

import { MenuMode } from '../../types'
import MenuContext from '../../MenuContext'

export interface Props {
  mode?: MenuMode
}

const useMenuMode = (props: Props) => {
  const { mode: propsMode } = props
  const { mode: contextMode } = useContext(MenuContext)

  return contextMode ?? propsMode
}

export default useMenuMode
