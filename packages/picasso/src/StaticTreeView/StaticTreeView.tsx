import React, { useLayoutEffect, useState, useMemo, useRef } from 'react'

import {
  TreeViewPropsBase,
  useTree,
  TreeViewPropsDefaults,
  TreeViewSvg,
  useFinalMargins
} from '../TreeView/shared'
import { findExtremeNodes } from './utils/findExtremeNodes'

type SvgMeasurements = {
  width: number
  height: number
  topMostNodeY: number
  leftMostNodeX: number
}

type Props = TreeViewPropsBase

const StaticTreeView = (props: Props) => {
  const {
    data,
    renderNode,
    nodeWidth = StaticTreeView.defaultProps.nodeWidth,
    nodeHeight = StaticTreeView.defaultProps.nodeHeight
  } = props

  const {
    direction = StaticTreeView.defaultProps.directionProps.direction,
    variant = StaticTreeView.defaultProps.directionProps.variant
  } = props.directionProps ?? StaticTreeView.defaultProps.directionProps

  const [verticalMargin, horizontalMargin] = useFinalMargins(
    direction,
    props.directionProps?.verticalMargin,
    props.directionProps?.horizontalMargin
  )

  const { nodes, links } = useTree({
    data,
    direction,
    verticalMargin,
    horizontalMargin,
    nodeWidth,
    nodeHeight,
    variant
  })

  const svgRef = useRef<SVGSVGElement>(null)
  const [svgMeasurements, setSvgMeasurements] = useState<SvgMeasurements>({
    width: 200,
    height: 400,
    topMostNodeY: 0,
    leftMostNodeX: 0
  })

  useLayoutEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox()
      const extremes = findExtremeNodes(nodes)

      setSvgMeasurements({
        width: bbox.width,
        height: bbox.height,
        topMostNodeY: extremes?.topMostNode.y ?? 0,
        leftMostNodeX: extremes?.leftMostNode.x ?? 0
      })
    }
  }, [svgRef, nodes])

  const transforms = useMemo(() => {
    return {
      svgViewBox: `0 0 ${svgMeasurements.width} ${svgMeasurements.height}`,
      gTransform:
        direction === 'horizontal'
          ? `translate(0, ${-1 * svgMeasurements.topMostNodeY})`
          : `translate(${-1 * svgMeasurements.leftMostNodeX}, 0)`
    }
  }, [svgMeasurements, direction])

  return (
    <TreeViewSvg
      ref={svgRef}
      nodes={nodes}
      links={links}
      direction={direction}
      verticalMargin={verticalMargin}
      horizontalMargin={horizontalMargin}
      renderNode={renderNode}
      svgProps={{
        viewBox: transforms.svgViewBox
      }}
      graphProps={{
        transform: transforms.gTransform
      }}
    />
  )
}

StaticTreeView.defaultProps = TreeViewPropsDefaults

StaticTreeView.displayName = 'StaticTreeView'

export default StaticTreeView
