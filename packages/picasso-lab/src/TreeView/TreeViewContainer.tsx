import React, { FC, useState } from 'react'
import * as d3 from 'd3'

import { TreeViewContextProps } from './types'

type TreeViewContextValue = {
  state: TreeViewContextProps
  updateState(newState: Partial<TreeViewContextProps>): void
}

const treeContextValue: TreeViewContextValue = {
  state: {},
  updateState: () => {}
}

export const TreeViewContext = React.createContext<TreeViewContextValue>(
  treeContextValue
)

export const TreeViewContainer: FC = ({ children }) => {
  const [state, setState] = useState<TreeViewContextProps>({})

  const updateState = (newState: Partial<TreeViewContextProps>) => {
    setState({
      ...state,
      ...newState
    })
  }

  const zoomHandler = (step: number) => {
    if (!state.ref || !state.zoom) return

    d3.select(state.ref)
      .transition()
      .call(state.zoom.scaleBy, step)
  }

  return (
    <TreeViewContext.Provider
      value={{
        state: {
          ...state,
          zoomHandler
        },
        updateState
      }}
    >
      {children}
    </TreeViewContext.Provider>
  )
}
