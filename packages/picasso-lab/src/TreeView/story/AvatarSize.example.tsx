import React from 'react'
import {
  TreeView,
  TreeNodeInterface,
  TreeNodeAvatar
} from '@toptal/picasso-lab'
import { Container, UserBadge } from '@toptal/picasso'
import { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const NodeContainer = styled<typeof Container>(Container)<{
  selected?: boolean
}>`
  display: flex;
  align-items: center;
  width: 236px;
  padding: 0.5rem;
  ${({ selected }) =>
    `border: 1px solid ${selected ? palette.blue.main : palette.grey.light2};`}
`

const createTreeNode = (
  override: Partial<TreeNodeInterface> = {}
): TreeNodeInterface => {
  return {
    id: '1',
    disabled: false,
    selected: false,
    children: [],
    info: {
      name: 'NODE+NAME+1'
    },
    ...override
  }
}

const rootNode = createTreeNode({
  id: '1',
  selected: true,
  selectedOffset: {
    y: 150
  },
  info: {
    name: 'NODE+1',
    size: 'xxsmall'
  },
  children: [
    createTreeNode({
      id: '1.2',
      info: {
        name: 'NODE+2',
        size: 'xsmall'
      }
    }),
    createTreeNode({
      id: '1.3',
      info: {
        name: 'NODE+3',
        size: 'small'
      }
    }),
    createTreeNode({
      id: '1.4',
      info: {
        name: 'NODE+4',
        size: 'medium'
      }
    }),
    createTreeNode({
      id: '1.5',
      info: {
        name: 'NODE+5',
        size: 'large'
      }
    })
  ]
})

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  return (
    <NodeContainer>
      <UserBadge
        name={pointNode.data.info.size}
        avatar={
          <TreeNodeAvatar
            name={pointNode.data.info.name}
            size={pointNode.data.info.size}
          />
        }
      />
    </NodeContainer>
  )
}

const Example = () => (
  <Container style={{ height: '25em' }}>
    <TreeView data={rootNode} renderNode={renderNode} initialScale={0.8} />
  </Container>
)

export default Example
