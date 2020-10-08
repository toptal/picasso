import React, { createRef, useMemo } from 'react'
// import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates
import { Theme, makeStyles } from '@material-ui/core/styles'

// Re-using some stuff from TreeView. TODO: Move this stuff to a shared folder.
import Zoom from '../TreeView/Zoom'
import { useZoom } from '../TreeView/useZoom'
import styles from './styles'
import { DEFAULT_SCALE_EXTENT } from './variables'
import { GraphData, GraphNodeData, GraphNodeId } from './types'
import useGraph from './useGraph'

export interface Props {
  /** List of nodes and links of the Graph */
  data: GraphData
  /** Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor */
  scaleExtent?: [number, number]
  /** Initial SVG scale */
  initialScale?: number
  /** Whether need to show zoom or not */
  showZoom?: boolean
  /** Scales the current zoom transform by coefficient */
  scaleCoefficient?: number
  /** Selected node */
  selected?: GraphNodeId
  /** Method that will be invoked with hovered node data */
  onMouseOver?: (value: GraphNodeData) => void
  /** Method that will be invoked with clicked node data */
  onClick?: (value: GraphNodeData) => void
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoGraphView' })

export const GraphView = (props: Props) => {
  const {
    data,
    scaleExtent = DEFAULT_SCALE_EXTENT,
    initialScale = 1,
    scaleCoefficient = 0.5,
    showZoom,
    selected,
    onMouseOver,
    onClick
  } = props
  const classes = useStyles(props)
  const rootRef = createRef<SVGSVGElement>()
  const selectedNode = null // TODO: implement node selection.
  const center = useMemo<{ x: number; y: number } | undefined>(() => {
    if (!selectedNode) return undefined
    // TODO: implement node selection
    // const { x: xPosition, y: yPosition, data } = selectedNode

    // return {
    //   x: xPosition + (data.selectedOffset?.x || 0),
    //   y: yPosition + (data.selectedOffset?.y || 0)
    // }
  }, [selectedNode])
  const { handleZoom } = useZoom<SVGSVGElement>({
    rootRef,
    scaleExtent,
    center,
    initialScale
  })

  useGraph({
    rootRef,
    data,
    selected,
    onMouseOver,
    onClick
  })

  return (
    <div className={classes.root}>
      {showZoom && (
        <Zoom handleZoom={handleZoom} scaleCoefficient={scaleCoefficient} />
      )}
      <svg ref={rootRef} className={classes.svg}>
        <g className='main' />
      </svg>
    </div>
  )
}

GraphView.defaultProps = {
  scaleExtent: DEFAULT_SCALE_EXTENT,
  initialScale: 1,
  scaleCoefficient: 0.5,
  showZoom: true
}

GraphView.displayName = 'GraphView'

export default GraphView
