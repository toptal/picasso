import React, { useState } from 'react'
import {
  TreeView,
  TreeNodeInterface,
  TreeNodeAvatar
} from '@toptal/picasso-lab'
import { Button, Container, UserBadge } from '@toptal/picasso'
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

interface DataItem {
  content: {
    name: string
    type: 'card' | 'group'
    members?: {
      name: string
    }[]
  }
  children: DataItem[]
}

const data: DataItem = {
  content: {
    name: 'Name Surname 1',
    type: 'card'
  },
  children: [
    {
      content: {
        name: 'Name Surname 2',
        type: 'card'
      },
      children: [
        {
          content: {
            name: 'Name Surname 3',
            type: 'group',
            members: [
              {
                name: 'Name Surname 4'
              },
              {
                name: 'Name Surname 5'
              },
              {
                name: 'Name Surname 6'
              },
              {
                name: 'Name Surname 7'
              },
              {
                name: 'Name Surname 8'
              }
            ]
          },
          children: []
        },
        {
          content: {
            name: 'Name Surname 9',
            type: 'card'
          },
          children: [
            {
              content: {
                name: 'Name Surname 10',
                type: 'group',
                members: [
                  {
                    name: 'Name Surname 11'
                  },
                  {
                    name: 'Name Surname 12'
                  },
                  {
                    name: 'Name Surname 13'
                  },
                  {
                    name: 'Name Surname 14'
                  },
                  {
                    name: 'Name Surname 15'
                  }
                ]
              },
              children: []
            }
          ]
        }
      ]
    },
    {
      content: {
        name: 'Name Surname 16',
        type: 'card'
      },
      children: [
        {
          content: {
            name: 'Name Surname 17',
            type: 'group',
            members: [
              {
                name: 'Name Surname 18'
              },
              {
                name: 'Name Surname 19'
              },
              {
                name: 'Name Surname 20'
              },
              {
                name: 'Name Surname 21'
              },
              {
                name: 'Name Surname 22'
              },
              {
                name: 'Name Surname 23'
              },
              {
                name: 'Name Surname 24'
              },
              {
                name: 'Name Surname 25'
              },
              {
                name: 'Name Surname 26'
              },
              {
                name: 'Name Surname 27'
              },
              { name: 'Name Surname 28' },
              { name: 'Name Surname 29' },
              { name: 'Name Surname 30' },
              { name: 'Name Surname 31' },
              { name: 'Name Surname 32' }
            ]
          },
          children: []
        }
      ]
    }
  ]
}

const convertToNode = (
  data: DataItem,
  selectedId: string | null
): TreeNodeInterface => {
  return {
    id: data.content.name,
    selected: data.content.name === selectedId,
    selectedOffset:
      data.content.type === 'group'
        ? {
            y: 150
          }
        : undefined,
    disabled: false,
    info: {
      name: data.content.name,
      type: data.content.type,
      members: data.content.members
    },
    children: data.children.map(child => convertToNode(child, selectedId))
  }
}

const createTree = (selectedId: string | null): TreeNodeInterface => {
  return convertToNode(data, selectedId)
}

const Example = () => {
  const [selectedId, setSelectedId] = useState<string | null>('Name Surname 1')

  const rootNode = createTree(selectedId)

  const onClick = (id: string) => {
    setSelectedId(id)
  }

  const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
    if (pointNode.data.info.type === 'group') {
      return (
        <NodeContainer onClick={() => onClick(pointNode.data.id)}>
          <div>
            {pointNode.data.info.members.map((member: { name: string }) => (
              <UserBadge
                name={member.name}
                key={member.name}
                avatar={<TreeNodeAvatar name={member.name} />}
              />
            ))}
          </div>
        </NodeContainer>
      )
    }

    return (
      <NodeContainer
        onClick={() => onClick(pointNode.data.id)}
        selected={pointNode.data.selected}
      >
        <UserBadge
          name={pointNode.data.info.name}
          avatar={<TreeNodeAvatar name={pointNode.data.info.name} />}
        />
      </NodeContainer>
    )
  }

  return (
    <Container style={{ height: '25em' }}>
      <Button size='small' onClick={() => setSelectedId(null)}>
        Reset selection
      </Button>
      <TreeView data={rootNode} renderNode={renderNode} initialScale={0.5} />
    </Container>
  )
}

export default Example
