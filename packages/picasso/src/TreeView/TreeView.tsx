import React, {
  createRef,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo
} from 'react'
import { HierarchyPointNode } from 'd3' // eslint-disable-line import/no-duplicates
import { Theme, makeStyles } from '@material-ui/core/styles'

import { TreeViewContext } from './TreeViewContainer'
import { useTree } from './useTree'
import Zoom from './Zoom'
import PointLink from './PointLink'
import PointNode from './PointNode'
import styles from './styles'
import { useZoom } from './useZoom'
import {
  DEFAULT_VERTICAL_MARGIN_V,
  DEFAULT_HORIZONTAL_MARGIN_V,
  DEFAULT_WIDTH,
  DEFAULT_SCALE_EXTENT
} from './variables'
import { DirectionsType, TreeNodeInterface, TreeViewVariant } from './types'
import { getFinalMargins } from './utils'

type DirectionOptions = {
  /** Determines the direction of the TreeView: vertical - top-to-bottom (default) or */
  direction?: DirectionsType
  /** Overrides default vertical margin - minimum vertical distance between nodes */
  verticalMargin?: number
  /** Overrides default horizontal margin - minimum horizontal distance between nodes */
  horizontalMargin?: number
  /** Variants of the tree: currently supports normal (default) and compact - special compact variant of the tree that works only for trees with one node with children per depth level */
  variant?: TreeViewVariant
}
export interface Props {
  /** Root node of the Tree */
  data: TreeNodeInterface
  /** Custom function for rendering Node. It expect the `node: HierarchyPointNode<TreeNodeInterface>` as an argument */
  renderNode?: (pointNode: HierarchyPointNode<TreeNodeInterface>) => ReactNode
  /** exact node width in pixels. Default value is 236 */
  nodeWidth?: number
  /** Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor */
  scaleExtent?: [number, number]
  /** Initial SVG scale */
  initialScale?: number
  /** Whether need to show zoom or not */
  showZoom?: boolean
  /** Scales the current zoom transform by coefficient */
  scaleCoefficient?: number
  /** Options related to tree direction */
  directionOptions?: DirectionOptions
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTreeView' })

export const TreeView = (props: Props) => {
  const {
    data,
    renderNode,
    nodeWidth = DEFAULT_WIDTH,
    scaleExtent = DEFAULT_SCALE_EXTENT,
    initialScale = 1,
    scaleCoefficient = 0.5,
    showZoom,
    directionOptions
  } = props

  const {
    direction = 'vertical',
    verticalMargin = DEFAULT_VERTICAL_MARGIN_V,
    horizontalMargin = DEFAULT_HORIZONTAL_MARGIN_V,
    variant = 'normal'
  } = directionOptions || {}

  const classes = useStyles()
  const rootRef = createRef<SVGSVGElement>()

  const [finalVerticalMargin, finalHorizontalMargin] = useMemo(
    () => getFinalMargins(direction, verticalMargin, horizontalMargin),
    [direction, verticalMargin, horizontalMargin]
  )

  const { nodes, links, selectedNode } = useTree({
    data,
    direction,
    verticalMargin: finalVerticalMargin,
    horizontalMargin: finalHorizontalMargin,
    variant
  })

  const center = useMemo<{ x: number; y: number } | undefined>(() => {
    if (!selectedNode) {
      return undefined
    }

    const { x: xPosition, y: yPosition, data: nodeData } = selectedNode

    return {
      x: xPosition + (nodeData.selectedOffset?.x || 0),
      y: yPosition + (nodeData.selectedOffset?.y || 0)
    }
  }, [selectedNode])

  const { handleZoom, zoom } = useZoom<SVGSVGElement>({
    rootRef,
    scaleExtent,
    center,
    initialScale
  })
  const [initialized, setInitialized] = useState(false)
  const { updateState } = useContext(TreeViewContext)

  useEffect(() => {
    if (!rootRef.current || initialized || !zoom) {
      return
    }

    updateState({
      ref: rootRef.current,
      zoom
    })
    setInitialized(true)
  }, [rootRef, initialized, zoom, updateState])

  return (
    <div className={classes.root}>
      {showZoom && (
        <Zoom handleZoom={handleZoom} scaleCoefficient={scaleCoefficient} />
      )}
      <svg ref={rootRef} className={classes.svg}>
        <g>
          {links.map(link => (
            <PointLink
              link={link}
              key={`link-${link.target.data.id}-${link.source.data.id}`}
              direction={direction}
              verticalMargin={finalVerticalMargin}
              horizontalMargin={finalHorizontalMargin}
            />
          ))}
          {nodes.map(node => (
            <PointNode
              ref={node.ref}
              node={node}
              key={`node-${node.data.id}`}
              renderNode={renderNode}
              nodeWidth={nodeWidth}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

TreeView.defaultProps = {
  nodeWidth: DEFAULT_WIDTH,
  scaleExtent: DEFAULT_SCALE_EXTENT,
  initialScale: 1,
  scaleCoefficient: 0.5,
  showZoom: true
}

TreeView.displayName = 'TreeView'

export default TreeView
