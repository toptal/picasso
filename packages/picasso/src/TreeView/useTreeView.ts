import { useContext } from 'react'

import { TreeViewContext } from './TreeViewContainer'

interface UseTreeViewResponse {
  zoomHandler: (step: number) => void
}

const defaultZoomHandler = () => {}

export const useTreeView = (): UseTreeViewResponse => {
  const { state } = useContext(TreeViewContext)

  return {
    zoomHandler: state.zoomHandler || defaultZoomHandler
  }
}
