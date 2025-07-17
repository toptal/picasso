import React, {
  createRef,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'

import { TreeViewContext } from './TreeViewContainer'
import { useTree } from './use-tree'
import Zoom from './Zoom'
import { useZoom } from './use-zoom'
import {
  DEFAULT_SCALE_EXTENT,
  DEFAULT_TRANSITION_DURATION,
  ZERO_VECTOR2,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_DIRECTION,
  DEFAULT_VARIANT,
} from './variables'
import type { TreeViewPropsBase, Vector2 } from './types'
import { TreeViewSvg } from './TreeViewSvg'
import { useFinalMargins } from './use-final-margins'

export interface Props extends TreeViewPropsBase {
  /** Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor */
  scaleExtent?: [number, number]
  /** Initial SVG scale */
  initialScale?: number
  /** Whether need to show zoom or not */
  showZoom?: boolean
  /** Scales the current zoom transform by coefficient */
  scaleCoefficient?: number
}

export const TreeView = ({
  nodeWidth = DEFAULT_WIDTH,
  nodeHeight = DEFAULT_HEIGHT,
  directionProps = {
    direction: DEFAULT_DIRECTION,
    variant: DEFAULT_VARIANT,
  },
  scaleExtent = DEFAULT_SCALE_EXTENT,
  initialScale = 1,
  scaleCoefficient = 0.5,
  showZoom = true,
  ...props
}: Props) => {
  const { data, renderNode } = props

  const { direction = DEFAULT_DIRECTION, variant = DEFAULT_VARIANT } =
    directionProps

  const rootRef = createRef<SVGSVGElement>()

  const [verticalMargin, horizontalMargin] = useFinalMargins(
    direction,
    directionProps.verticalMargin,
    directionProps.horizontalMargin
  )

  const { nodes, links, selectedNode } = useTree({
    data,
    direction,
    verticalMargin,
    horizontalMargin,
    nodeWidth,
    nodeHeight,
    variant,
  })

  const center = useMemo<Vector2>(() => {
    if (!selectedNode) {
      return ZERO_VECTOR2
    }

    const { x: xPosition, y: yPosition, data: nodeData } = selectedNode

    return {
      x: xPosition + nodeWidth / 2 + (nodeData.selectedOffset?.x || 0),
      y: yPosition + nodeHeight / 2 + (nodeData.selectedOffset?.y || 0),
    }
  }, [selectedNode, nodeWidth, nodeHeight])

  const { handleZoom, zoom } = useZoom<SVGSVGElement>({
    rootRef,
    scaleExtent,
    center: {
      x: center.x + ZERO_VECTOR2.x,
      y: center.y + ZERO_VECTOR2.y,
    },
    transitionDuration: DEFAULT_TRANSITION_DURATION,
    initialScale,
  })
  const [initialized, setInitialized] = useState(false)
  const { updateState } = useContext(TreeViewContext)

  useEffect(() => {
    if (!rootRef.current || initialized || !zoom) {
      return
    }

    updateState({
      ref: rootRef.current,
      zoom,
    })
    setInitialized(true)
  }, [rootRef, initialized, zoom, updateState])

  return (
    <div className='w-full h-full'>
      {showZoom && (
        <Zoom handleZoom={handleZoom} scaleCoefficient={scaleCoefficient} />
      )}
      <TreeViewSvg
        ref={rootRef}
        nodes={nodes}
        links={links}
        direction={direction}
        verticalMargin={verticalMargin}
        horizontalMargin={horizontalMargin}
        renderNode={renderNode}
        svgProps={{ className: 'w-full h-full' }}
      />
    </div>
  )
}

TreeView.displayName = 'TreeView'

export default TreeView
