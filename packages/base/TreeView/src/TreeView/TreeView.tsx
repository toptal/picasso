import React, {
  createRef,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { usePropDeprecationWarning } from '@toptal/picasso-utils'

import { TreeViewContext } from './TreeViewContainer'
import { useTree } from './use-tree'
import Zoom from './Zoom'
import styles from './styles'
import { useZoom } from './use-zoom'
import {
  DEFAULT_SCALE_EXTENT,
  ZERO_VECTOR2,
  TreeViewPropsDefaults,
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
  /** Custom center translation vector (happens after zoom center translation on selected node is applied) */
  centerTranslation?: Vector2
  /** Transition duration for centering animation in ms */
  transitionDuration?: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTreeView' })

export const TreeView = (props: Props) => {
  usePropDeprecationWarning({
    props,
    name: 'centerTranslation',
    componentName: 'TreeView',
    description:
      'If you happen to rely on it, you are likely would want to migrate to StaticTreeView component instead of TreeView',
  })

  usePropDeprecationWarning({
    props,
    name: 'transitionDuration',
    componentName: 'TreeView',
    description:
      'If you happen to rely on it, you are likely would want to migrate to StaticTreeView component instead of TreeView',
  })

  const {
    data,
    renderNode,
    nodeWidth = TreeView.defaultProps.nodeWidth,
    nodeHeight = TreeView.defaultProps.nodeHeight,
    scaleExtent = TreeView.defaultProps.scaleExtent,
    initialScale = TreeView.defaultProps.initialScale,
    scaleCoefficient = TreeView.defaultProps.scaleCoefficient,
    showZoom = TreeView.defaultProps.showZoom,
    // NOTE: these two are intentionally removed from defaultProps in order
    // to make usePropDeprecationWarning hook correctly detect their usage
    centerTranslation = ZERO_VECTOR2,
    transitionDuration = 750,
  } = props

  const {
    direction = TreeView.defaultProps.directionProps.direction,
    variant = TreeView.defaultProps.directionProps.variant,
  } = props.directionProps ?? TreeView.defaultProps.directionProps

  const classes = useStyles()
  const rootRef = createRef<SVGSVGElement>()

  const [verticalMargin, horizontalMargin] = useFinalMargins(
    direction,
    props.directionProps?.verticalMargin,
    props.directionProps?.horizontalMargin
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
      x: center.x + centerTranslation.x,
      y: center.y + centerTranslation.y,
    },
    transitionDuration,
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
    <div className={classes.root}>
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
        svgProps={{ className: classes.svg }}
      />
    </div>
  )
}

TreeView.defaultProps = {
  ...TreeViewPropsDefaults,
  scaleExtent: DEFAULT_SCALE_EXTENT,
  initialScale: 1,
  scaleCoefficient: 0.5,
  showZoom: true,
}

TreeView.displayName = 'TreeView'

export default TreeView