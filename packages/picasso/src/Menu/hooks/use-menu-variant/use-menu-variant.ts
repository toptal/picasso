import { useContext } from 'react'

import { MenuVariant } from '../../types'
import MenuContext from '../../MenuContext'

export interface Props {
  variant?: MenuVariant
}

const useMenuVariant = (props: Props) => {
  const { variant: propsVariant } = props
  const { variant: contextVariant } = useContext(MenuContext)

  return contextVariant ?? propsVariant
}

export default useMenuVariant
