import React, { useState, useMemo, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-utils'

import type { TreeViewPropsBase } from '../TreeView/types'
import { useTree, TreeViewSvg, useFinalMargins } from '../TreeView/shared'
import { findExtremeNodes } from './utils/find-extreme-nodes'
import {
  DEFAULT_DIRECTION,
  DEFAULT_HEIGHT,
  DEFAULT_VARIANT,
  DEFAULT_WIDTH,
} from '../TreeView/variables'

type SvgMeasurements = {
  width: number
  height: number
  topMostNodeY: number
  leftMostNodeX: number
}

type Props = TreeViewPropsBase

const StaticTreeView = ({
  nodeWidth = DEFAULT_WIDTH,
  nodeHeight = DEFAULT_HEIGHT,
  directionProps = {
    direction: DEFAULT_DIRECTION,
    variant: DEFAULT_VARIANT,
  },
  ...props
}: Props) => {
  const { data, renderNode } = props

  const { direction = DEFAULT_DIRECTION, variant = DEFAULT_VARIANT } =
    directionProps

  const [verticalMargin, horizontalMargin] = useFinalMargins(
    direction,
    directionProps.verticalMargin,
    directionProps.horizontalMargin
  )

  const { nodes, links } = useTree({
    data,
    direction,
    verticalMargin,
    horizontalMargin,
    nodeWidth,
    nodeHeight,
    variant,
  })

  const svgRef = useRef<SVGSVGElement>(null)
  const [svgMeasurements, setSvgMeasurements] = useState<SvgMeasurements>({
    width: 200,
    height: 400,
    topMostNodeY: 0,
    leftMostNodeX: 0,
  })

  useIsomorphicLayoutEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox()
      const extremes = findExtremeNodes(nodes)

      setSvgMeasurements({
        width: bbox.width,
        height: bbox.height,
        topMostNodeY: extremes?.topMostNode.y ?? 0,
        leftMostNodeX: extremes?.leftMostNode.x ?? 0,
      })
    }
  }, [svgRef, nodes])

  const transforms = useMemo(() => {
    return {
      svgViewBox: `0 0 ${svgMeasurements.width} ${svgMeasurements.height}`,
      gTransform:
        direction === 'horizontal'
          ? `translate(0, ${-1 * svgMeasurements.topMostNodeY})`
          : `translate(${-1 * svgMeasurements.leftMostNodeX}, 0)`,
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
        viewBox: transforms.svgViewBox,
      }}
      graphProps={{
        transform: transforms.gTransform,
      }}
    />
  )
}

StaticTreeView.displayName = 'StaticTreeView'

export default StaticTreeView
