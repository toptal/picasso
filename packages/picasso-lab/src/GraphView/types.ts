import { SimulationLinkDatum, SimulationNodeDatum } from 'd3'

export type GraphNodeId = string | number

export interface GraphNodeData extends SimulationNodeDatum {
  id: GraphNodeId
  name: string
  color?: string
}

export interface GraphLinkData extends SimulationLinkDatum<GraphNodeData> {
  label: string
  source: GraphNodeId
  target: GraphNodeId
}

export interface GraphData {
  nodes: GraphNodeData[]
  links: GraphLinkData[]
}
