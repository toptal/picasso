import React from 'react'
import {
  TreeView,
  TreeNodeInterface,
  TreeNodeAvatar,
  Container,
  UserBadge
} from '@toptal/picasso'
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

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: true,
    info: {
      name: 'NODE+1'
    },
    children: [
      createTreeNode({
        id: '2',
        info: {
          name: 'NODE+2'
        },
        children: []
      }),
      createTreeNode({
        id: '3',
        info: {
          name: 'NODE+3'
        },
        children: []
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4'
        },
        children: [
          createTreeNode({
            id: '4.0',
            info: {
              name: 'NODE+4.0'
            },
            children: []
          }),
          createTreeNode({
            id: '4.1',
            info: {
              name: 'NODE+4.1'
            },
            children: []
          }),
          createTreeNode({
            id: '4.2',
            info: {
              name: 'NODE+4.2'
            },
            children: []
          }),
          createTreeNode({
            id: '4.3',
            info: {
              name: 'NODE+4.3'
            },
            children: []
          }),
          createTreeNode({
            id: '4.4',
            info: {
              name: 'NODE+4.4'
            },
            children: []
          }),

          createTreeNode({
            id: '4.5',
            info: {
              name: 'NODE+4.5'
            },
            children: []
          }),
          createTreeNode({
            id: '4.6',
            info: {
              name: 'NODE+4.6'
            },
            children: []
          }),
          createTreeNode({
            id: '4.7',
            info: {
              name: 'NODE+4.7'
            },
            children: []
          }),
          createTreeNode({
            id: '4.8',
            info: {
              name: 'NODE+4.8'
            },
            children: []
          }),
          createTreeNode({
            id: '4.9',
            info: {
              name: 'NODE+4.9'
            },
            children: []
          })
        ]
      }),
      createTreeNode({
        id: '5',
        info: {
          name: 'NODE+5'
        },
        children: []
      }),
      createTreeNode({
        id: '6',
        info: {
          name: 'NODE+6'
        },
        children: []
      })
    ]
  })
}

const rootNode = createTree()

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  return (
    <NodeContainer>
      <UserBadge
        name={pointNode.data.info.name}
        avatar={
          <TreeNodeAvatar name={pointNode.data.info.name} size='xsmall' />
        }
      />
    </NodeContainer>
  )
}

const Example = () => (
  <Container style={{ height: '25em' }}>
    <TreeView
      data={rootNode}
      renderNode={renderNode}
      initialScale={0.8}
      verticalMargin={20}
      horizontalMargin={200}
      direction='horizontal'
      variant='compact'
    />
  </Container>
)

export default Example
