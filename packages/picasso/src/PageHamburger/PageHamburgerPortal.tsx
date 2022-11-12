import React, { useCallback, useContext } from 'react'
import Portal from '@material-ui/core/Portal'

import PageHamburgerContext, {
  PageHamburgerContextProps,
} from './PageHamburgerContext'
import { getHamburgerContainer } from './utils'

type Props = {
  children: React.ReactNode
}

const PageHamburgerPortal = ({ children }: Props) => {
  const { hamburgerId } =
    useContext<PageHamburgerContextProps>(PageHamburgerContext)
  const container = useCallback(
    () => getHamburgerContainer(hamburgerId),
    [hamburgerId]
  )

  return <Portal container={container}>{children}</Portal>
}

export default PageHamburgerPortal
