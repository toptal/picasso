import React, { useState } from 'react'
import { TreeView, TreeNodeInterface } from '@toptal/picasso-lab'
import { Container, UserBadge } from '@toptal/picasso'
import { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso/utils'

const NodeContainer = styled<typeof Container>(Container)<{
  selected?: boolean
}>`
  display: flex;
  alignitems: center;
  width: 236px;
  padding: 0.5rem;
  ${({ selected }) =>
    `border: 1px solid ${selected ? palette.blue.main : palette.grey.light};`}
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

const createTree = (seletedId?: string): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: seletedId === '1',
    info: {
      name: 'NODE+1'
    },
    children: [
      createTreeNode({
        id: '2',
        selected: seletedId === '2',
        info: {
          name: 'NODE+2'
        },
        children: [
          createTreeNode({
            id: '3',
            selected: seletedId === '3',
            info: {
              name: 'NODE+3'
            },
            children: [
              createTreeNode({
                id: '3.1',
                selected: seletedId === '3.1',
                info: {
                  name: 'NODE+3.1'
                },
                children: [
                  createTreeNode({
                    id: '3.1.1',
                    selected: seletedId === '3.1.1',
                    info: {
                      name: 'NODE+3.1.1'
                    }
                  }),
                  createTreeNode({
                    id: '3.1.2',
                    selected: seletedId === '3.1.2',
                    info: {
                      name: 'NODE+3.1.2'
                    }
                  })
                ]
              }),
              createTreeNode({
                id: '3.2',
                selected: seletedId === '3.2',
                info: {
                  name: 'NODE+3.2'
                },
                children: [
                  createTreeNode({
                    id: '3.2.1',
                    selected: seletedId === '3.2.1',
                    info: {
                      name: 'NODE+3.2.1'
                    }
                  }),
                  createTreeNode({
                    id: '3.2.2',
                    selected: seletedId === '3.2.2',
                    info: {
                      name: 'NODE+3.2.2'
                    }
                  })
                ]
              })
            ]
          })
        ]
      }),
      createTreeNode({
        id: '4',
        selected: seletedId === '4',
        info: {
          name: 'NODE+4'
        },
        children: [
          createTreeNode({
            id: '4.1',
            selected: seletedId === '4.1',
            info: {
              name: 'NODE+4.1'
            },
            children: [
              createTreeNode({
                id: '4.1.1',
                selected: seletedId === '4.1.1',
                info: {
                  name: 'NODE+4.1.1'
                }
              }),
              createTreeNode({
                id: '4.1.2',
                selected: seletedId === '4.1.2',
                info: {
                  name: 'NODE+4.1.2'
                }
              })
            ]
          })
        ]
      })
    ]
  })
}

const Example = () => {
  const [selectedId, setSelectedId] = useState('3.1.2')

  const rootNode = createTree(selectedId)

  const onClick = (id: string) => {
    setSelectedId(id)
  }

  const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
    if (pointNode.data.id === '2') {
      return (
        <NodeContainer>
          <div>
            <UserBadge name='QQQQQQQQ QQQQQQQQ' />
            <UserBadge name='QQQQQQQQ QQQQQQQQ' />
            <UserBadge name='QQQQQQQQ QQQQQQQQ' />
            <UserBadge name='QQQQQQQQ QQQQQQQQ' />
            <UserBadge name='QQQQQQQQ QQQQQQQQ' />
          </div>
        </NodeContainer>
      )
    }

    return (
      <NodeContainer
        onClick={() => onClick(pointNode.data.id)}
        selected={pointNode.data.selected}
      >
        <UserBadge name={pointNode.data.info.name} />
      </NodeContainer>
    )
  }

  return <TreeView data={rootNode} renderNode={renderNode} initialScale={0.5} />
}

export default Example
