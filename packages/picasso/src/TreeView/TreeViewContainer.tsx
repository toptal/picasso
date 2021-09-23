import React, { FC, useState } from 'react'
import * as d3 from 'd3' // eslint-disable-line import/no-duplicates
import { zoomTransform } from 'd3' // eslint-disable-line import/no-duplicates

import { TreeViewContextProps } from './types'

type TreeViewContextValue = {
  state: TreeViewContextProps
  updateState: (newState: Partial<TreeViewContextProps>) => void
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
    if (!state.ref || !state.zoom) {
      return
    }

    d3.select(state.ref)
      .transition()
      .call(
        state.zoom.scaleTo,
        function (
          this: SVGSVGElement,
          datum: unknown,
          index: number,
          groups: any
        ) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const defaultExtent = state.zoom!.extent()
          const k0 = zoomTransform(this).k
          // @ts-ignore
          const extent = defaultExtent.apply(this, [datum, index, groups])
          const width = extent[1][0]
          // support backward compatibility for the `step` argument
          const k1 = step > 1 ? step - 1 : -step

          return (width * k0 + width * k1) / width
        }
      )
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
