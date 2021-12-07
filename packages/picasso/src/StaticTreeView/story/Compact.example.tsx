import React from 'react'
import {
  TreeNodeInterface,
  TreeNodeAvatar,
  Container,
  UserBadge,
  StaticTreeView
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

let id = 0
const getId = () => {
  id += 1

  return String(id)
}

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: getId(),
    selected: true,
    info: {
      name: 'NODE-1'
    },
    children: [
      createTreeNode({
        id: getId(),
        info: {
          name: 'NODE-1-1'
        },
        children: [
          ...Array(3)
            .fill(undefined)
            .map((_, index) =>
              createTreeNode({
                id: getId(),
                info: {
                  name: `NODE-1-1-${index + 1}-before`
                },
                children: []
              })
            ),
          createTreeNode({
            id: getId(),
            info: {
              name: 'NODE-1-1-N'
            },
            children: Array(8)
              .fill(undefined)
              .map((_, index) =>
                createTreeNode({
                  id: getId(),
                  info: {
                    name: `NODE-1-1-1-${index + 1}`
                  },
                  children: []
                })
              )
          }),
          ...Array(8)
            .fill(undefined)
            .map((_, index) =>
              createTreeNode({
                id: getId(),
                info: {
                  name: `NODE-1-1-${index + 1}-after`
                },
                children: []
              })
            )
        ]
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
  <Container style={{ display: 'grid', placeItems: 'center' }}>
    <Container style={{ minHeight: '25rem', width: '100%', maxWidth: 1200 }}>
      <StaticTreeView
        data={rootNode}
        renderNode={renderNode}
        directionProps={{
          verticalMargin: 20,
          horizontalMargin: 200,
          direction: 'horizontal',
          variant: 'compact'
        }}
      />
    </Container>
  </Container>
)

export default Example
