export const findExtremeNodes = <T extends { x: number; y: number }>(
  nodes: T[]
):
  | {
      topMostNode: T
      leftMostNode: T
    }
  | undefined => {
  if (nodes.length === 0) {
    return
  }
  let topMostNode = nodes[0]
  let leftMostNode = nodes[0]

  for (const node of nodes) {
    if (node.y < topMostNode.y) {
      topMostNode = node
    }
    if (node.x < leftMostNode.x) {
      leftMostNode = node
    }
  }

  return { topMostNode, leftMostNode }
}
