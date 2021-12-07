import { createRef, useMemo, useRef, useLayoutEffect, useState } from 'react'
import { HierarchyPointNode } from 'd3-hierarchy'

import { DirectionsType, DynamicPointNode, TreeNodeInterface } from './types'

const getDynamicNodes = (
  nodes: HierarchyPointNode<TreeNodeInterface>[]
): DynamicPointNode[] => {
  return nodes.map(node => {
    return Object.assign(node, {
      ref: createRef<SVGGElement>(),
      rect: {
        width: 0,
        height: 0
      }
    })
  })
}

const updateNodesXorYPosition = (
  nodes: DynamicPointNode[],
  direction: DirectionsType,
  verticalMargin: number,
  horizontalMargin: number
): DynamicPointNode[] => {
  return nodes
    .sort((left, right) => left.depth - right.depth)
    .map(node => {
      if (
        !node.ref.current ||
        !node.ref.current.firstElementChild ||
        !node.ref.current.firstElementChild.firstElementChild
      ) {
        return node
      }

      const { offsetWidth: width, offsetHeight: height } = node.ref.current
        .firstElementChild.firstElementChild as HTMLElement

      if (!height || !width) {
        return node
      }

      if (direction === 'horizontal') {
        node.x = 0
      } else {
        node.y = 0
      }

      node.rect = {
        width,
        height
      }

      if (node.parent) {
        const positionDeltas = {
          horizontal: node.parent.x + node.parent.rect.width + horizontalMargin,
          vertical: node.parent.y + node.parent.rect.height + verticalMargin
        }

        if (direction === 'horizontal') {
          node.x = positionDeltas[direction]
        } else {
          node.y = positionDeltas[direction]
        }
      }

      return node
    })
}

/**
 * That hook expects the rootNode of the tree and returns the list of nodes with predefined position values
 * Coz, the exact node contains the ReactElement, so it's not clear the real sizes of the node before the rendering.
 * That hook handles that problem by listening the changes from the render and recalculating positions.
 * Also, the data of the `rootNode` can be changed — that hook handles it as well.
 */
export const useNodes = (
  rootNode: HierarchyPointNode<TreeNodeInterface>,
  direction: DirectionsType,
  verticalMargin: number,
  horizontalMargin: number
): DynamicPointNode[] => {
  const [initialized, setInitializedState] = useState<boolean>(false)
  const initialNodes = useRef<DynamicPointNode[] | undefined>()

  // we only need to prepare initial nodes once, on a first render
  if (!initialNodes.current) {
    initialNodes.current = getDynamicNodes(rootNode.descendants())
  }

  const dynamicNodes = useMemo(() => {
    const latestNodes = rootNode.descendants()

    if (!initialNodes.current) {
      return []
    }

    return initialNodes.current.map<DynamicPointNode>(node => {
      const foundNode = latestNodes.find(
        (latestNode: HierarchyPointNode<TreeNodeInterface>) =>
          latestNode.data.id === node.data.id
      )

      if (!foundNode) {
        return node
      }

      return Object.assign(node, {
        data: foundNode.data
      })
    })
  }, [rootNode, initialNodes])

  const nodes = useMemo<DynamicPointNode[]>(() => {
    return updateNodesXorYPosition(
      dynamicNodes,
      direction,
      verticalMargin,
      horizontalMargin
    )
    // we have to render nodes twice: first for the initial showing data, and the second one — with the correct positions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicNodes, initialized, direction, verticalMargin, horizontalMargin])

  useLayoutEffect(() => {
    if (!dynamicNodes[0].ref.current || initialized) {
      return
    }

    // as soon as `ref.current` appears, we can take positions for each node
    setInitializedState(true)
  }, [dynamicNodes, initialized])

  return nodes
}
