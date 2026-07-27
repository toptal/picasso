# TreeView

Allows rendering a tree view

## Props

### TreeView

| Name | Type | Default | Description |
|------|------|---------|-------------|
| scaleExtent | `[number, number]` | `[0.1, 5]` | Set the scale extent to the specified array of numbers [k0, k1] where k0 is the minimum allowed scale factor and k1 is the maximum allowed scale factor |
| initialScale | `number` | `1` | Initial SVG scale |
| showZoom | `boolean` | `true` | Whether need to show zoom or not |
| scaleCoefficient | `number` | `0.5` | Scales the current zoom transform by coefficient |
| **data** | `TreeNodeInterface` | - | Root node of the Tree |
| renderNode | `((pointNode: HierarchyPointNode<TreeNodeInterface>) => ReactNode)` | - | Custom function for rendering Node. It expects the `node: HierarchyPointNode<TreeNodeInterface>` as an argument |
| nodeWidth | `number` | `236` | exact node width in pixels. Default value is 236 |
| nodeHeight | `number` | `59` | exact node height in pixels. Default value is 59 |
| directionProps | `{ direction?: DirectionsType; verticalMargin?: number; horizontalMargin?: number \| undefined; variant?: TreeViewVariant \| undefined; } \| undefined` | `{
    direction: DEFAULT_DIRECTION,
    variant: DEFAULT_VARIANT,
  }` | Props related to tree direction |

### Default

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import { TreeView, TreeNodeAvatar, Container, UserBadge } from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
      name: 'NODE+NAME+1',
    },
    ...override,
  }
}

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: true,
    info: {
      name: 'NODE+1',
    },
    children: [
      createTreeNode({
        id: '2',
        info: {
          name: 'NODE+2',
        },
        children: [
          createTreeNode({
            id: '3',
            info: {
              name: 'NODE+3',
            },
          }),
        ],
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4',
        },
        children: [
          createTreeNode({
            id: '4.1',
            info: {
              name: 'NODE+4.1',
            },
          }),
          createTreeNode({
            id: '4.2',
            info: {
              name: 'NODE+4.2',
            },
          }),
          createTreeNode({
            id: '4.3',
            info: {
              name: 'NODE+4.3',
            },
          }),
        ],
      }),
    ],
  })
}

const rootNode = createTree()

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  if (pointNode.data.id === '2') {
    return (
      <NodeContainer>
        <div>
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={
              <TreeNodeAvatar
                name='QQQQQQQQ QQQQQQQQ'
                src='./jacqueline-with-flowers-1954-square.jpg'
              />
            }
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
        </div>
      </NodeContainer>
    )
  }

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
    <TreeView data={rootNode} renderNode={renderNode} initialScale={0.8} />
  </Container>
)

export default Example
```

### With selected node

To set the particular node selected, you need to set `node`'s attribute *selected* to `true`. Also there is additional attribute `selectedOffset` for adding an scroll offset for particular node

```tsx
import React, { useState } from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import {
  TreeView,
  TreeNodeAvatar,
  Button,
  Container,
  UserBadge,
} from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
    type: 'card',
  },
  children: [
    {
      content: {
        name: 'Name Surname 2',
        type: 'card',
      },
      children: [
        {
          content: {
            name: 'Name Surname 3',
            type: 'group',
            members: [
              {
                name: 'Name Surname 4',
              },
              {
                name: 'Name Surname 5',
              },
              {
                name: 'Name Surname 6',
              },
              {
                name: 'Name Surname 7',
              },
              {
                name: 'Name Surname 8',
              },
            ],
          },
          children: [],
        },
        {
          content: {
            name: 'Name Surname 9',
            type: 'card',
          },
          children: [
            {
              content: {
                name: 'Name Surname 10',
                type: 'group',
                members: [
                  {
                    name: 'Name Surname 11',
                  },
                  {
                    name: 'Name Surname 12',
                  },
                  {
                    name: 'Name Surname 13',
                  },
                  {
                    name: 'Name Surname 14',
                  },
                  {
                    name: 'Name Surname 15',
                  },
                ],
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      content: {
        name: 'Name Surname 16',
        type: 'card',
      },
      children: [
        {
          content: {
            name: 'Name Surname 17',
            type: 'group',
            members: [
              {
                name: 'Name Surname 18',
              },
              {
                name: 'Name Surname 19',
              },
              {
                name: 'Name Surname 20',
              },
              {
                name: 'Name Surname 21',
              },
              {
                name: 'Name Surname 22',
              },
              {
                name: 'Name Surname 23',
              },
              {
                name: 'Name Surname 24',
              },
              {
                name: 'Name Surname 25',
              },
              {
                name: 'Name Surname 26',
              },
              {
                name: 'Name Surname 27',
              },
              { name: 'Name Surname 28' },
              { name: 'Name Surname 29' },
              { name: 'Name Surname 30' },
              { name: 'Name Surname 31' },
              { name: 'Name Surname 32' },
            ],
          },
          children: [],
        },
      ],
    },
  ],
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
            y: 150,
          }
        : undefined,
    disabled: false,
    info: {
      name: data.content.name,
      type: data.content.type,
      members: data.content.members,
    },
    children: data.children.map(child => convertToNode(child, selectedId)),
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
```

### With Modal

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import {
  TreeView,
  TreeNodeAvatar,
  Button,
  Container,
  Modal,
  UserBadge,
} from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import { useModal, palette } from '@toptal/picasso-utils'
import styled from 'styled-components'

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
      name: 'NODE+NAME+1',
    },
    ...override,
  }
}

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: true,
    info: {
      name: 'NODE+1',
    },
    children: [
      createTreeNode({
        id: '2',
        info: {
          name: 'NODE+2',
        },
        children: [
          createTreeNode({
            id: '3',
            info: {
              name: 'NODE+3',
            },
            children: [
              createTreeNode({
                id: '3.1',
                info: {
                  name: 'NODE+3.1',
                },
                children: [
                  createTreeNode({
                    id: '3.1.1',
                    info: {
                      name: 'NODE+3.1.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.1.2',
                    info: {
                      name: 'NODE+3.1.2',
                    },
                  }),
                ],
              }),
              createTreeNode({
                id: '3.2',
                info: {
                  name: 'NODE+3.2',
                },
                children: [
                  createTreeNode({
                    id: '3.2.1',
                    info: {
                      name: 'NODE+3.2.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.2.2',
                    info: {
                      name: 'NODE+3.2.2',
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4',
        },
        children: [
          createTreeNode({
            id: '4.1',
            info: {
              name: 'NODE+4.1',
            },
            children: [
              createTreeNode({
                id: '4.1.1',
                info: {
                  name: 'NODE+4.1.1',
                },
              }),
              createTreeNode({
                id: '4.1.2',
                info: {
                  name: 'NODE+4.1.2',
                },
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

const rootNode = createTree()

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  if (pointNode.data.id === '2') {
    return (
      <NodeContainer>
        <div>
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={
              <TreeNodeAvatar
                name='QQQQQQQQ QQQQQQQQ'
                src='./jacqueline-with-flowers-1954-square.jpg'
              />
            }
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
        </div>
      </NodeContainer>
    )
  }

  return (
    <NodeContainer>
      <UserBadge
        name={pointNode.data.info.name}
        avatar={<TreeNodeAvatar name={pointNode.data.info.name} />}
      />
    </NodeContainer>
  )
}

const ModalTreeDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <Modal onClose={onClose} open={open} size='full-screen'>
      <Modal.Title>Modal Tree View</Modal.Title>
      <Modal.Content data-testid='tree-dialog-content'>
        <TreeView data={rootNode} renderNode={renderNode} />
      </Modal.Content>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button data-testid='open' onClick={showModal}>
        Open
      </Button>
      <ModalTreeDialog open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
```

### Custom Zoom

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import {
  TreeView,
  TreeViewContainer,
  useTreeView,
  TreeNodeAvatar,
  Button,
  Container,
  UserBadge,
} from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
      name: 'NODE+NAME+1',
    },
    ...override,
  }
}

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: true,
    info: {
      name: 'NODE+1',
    },
    children: [
      createTreeNode({
        id: '2',
        info: {
          name: 'NODE+2',
        },
        children: [
          createTreeNode({
            id: '3',
            info: {
              name: 'NODE+3',
            },
            children: [
              createTreeNode({
                id: '3.1',
                info: {
                  name: 'NODE+3.1',
                },
                children: [
                  createTreeNode({
                    id: '3.1.1',
                    info: {
                      name: 'NODE+3.1.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.1.2',
                    info: {
                      name: 'NODE+3.1.2',
                    },
                  }),
                ],
              }),
              createTreeNode({
                id: '3.2',
                info: {
                  name: 'NODE+3.2',
                },
                children: [
                  createTreeNode({
                    id: '3.2.1',
                    info: {
                      name: 'NODE+3.2.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.2.2',
                    info: {
                      name: 'NODE+3.2.2',
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4',
        },
        children: [
          createTreeNode({
            id: '4.1',
            info: {
              name: 'NODE+4.1',
            },
            children: [
              createTreeNode({
                id: '4.1.1',
                info: {
                  name: 'NODE+4.1.1',
                },
              }),
              createTreeNode({
                id: '4.1.2',
                info: {
                  name: 'NODE+4.1.2',
                },
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

const rootNode = createTree()

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  if (pointNode.data.id === '2') {
    return (
      <NodeContainer>
        <div>
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={
              <TreeNodeAvatar
                name='QQQQQQQQ QQQQQQQQ'
                src='./jacqueline-with-flowers-1954-square.jpg'
              />
            }
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
        </div>
      </NodeContainer>
    )
  }

  return (
    <NodeContainer>
      <UserBadge
        name={pointNode.data.info.name}
        avatar={<TreeNodeAvatar name={pointNode.data.info.name} />}
      />
    </NodeContainer>
  )
}

const CustomZoom = () => {
  const { zoomHandler } = useTreeView()

  return (
    <Container>
      <Button size='medium' variant='positive' onClick={() => zoomHandler(0.3)}>
        &minus;
      </Button>
      <Button size='medium' variant='positive' onClick={() => zoomHandler(1.3)}>
        +
      </Button>
    </Container>
  )
}

const Example = () => (
  <Container style={{ height: '25em' }}>
    <TreeViewContainer>
      <CustomZoom />
      <TreeView data={rootNode} renderNode={renderNode} showZoom={false} />
    </TreeViewContainer>
  </Container>
)

export default Example
```

### Avatar Size

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import { TreeView, TreeNodeAvatar, Container, UserBadge } from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
      name: 'NODE+NAME+1',
    },
    ...override,
  }
}

const rootNode = createTreeNode({
  id: '1',
  selected: true,
  selectedOffset: {
    y: 150,
  },
  info: {
    name: 'NODE+1',
    size: 'xxsmall',
  },
  children: [
    createTreeNode({
      id: '1.2',
      info: {
        name: 'NODE+2',
        size: 'xsmall',
      },
    }),
    createTreeNode({
      id: '1.3',
      info: {
        name: 'NODE+3',
        size: 'small',
      },
    }),
    createTreeNode({
      id: '1.4',
      info: {
        name: 'NODE+4',
        size: 'medium',
      },
    }),
    createTreeNode({
      id: '1.5',
      info: {
        name: 'NODE+5',
        size: 'large',
      },
    }),
  ],
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
```

### Horizontal Direction

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import { TreeView, TreeNodeAvatar, Container, UserBadge } from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
      name: 'NODE+NAME+1',
    },
    ...override,
  }
}

const createTree = (): TreeNodeInterface => {
  return createTreeNode({
    id: '1',
    selected: true,
    info: {
      name: 'NODE+1',
    },
    children: [
      createTreeNode({
        id: '2',
        info: {
          name: 'NODE+2',
        },
        children: [
          createTreeNode({
            id: '3',
            info: {
              name: 'NODE+3',
            },
            children: [
              createTreeNode({
                id: '3.1',
                info: {
                  name: 'NODE+3.1',
                },
                children: [
                  createTreeNode({
                    id: '3.1.1',
                    info: {
                      name: 'NODE+3.1.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.1.2',
                    info: {
                      name: 'NODE+3.1.2',
                    },
                  }),
                ],
              }),
              createTreeNode({
                id: '3.2',
                info: {
                  name: 'NODE+3.2',
                },
                children: [
                  createTreeNode({
                    id: '3.2.1',
                    info: {
                      name: 'NODE+3.2.1',
                    },
                  }),
                  createTreeNode({
                    id: '3.2.2',
                    info: {
                      name: 'NODE+3.2.2',
                    },
                  }),
                  createTreeNode({
                    id: '3.2.3',
                    info: {
                      name: 'NODE+3.2.3',
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4',
        },
        children: [
          createTreeNode({
            id: '4.1',
            info: {
              name: 'NODE+4.1',
            },
            children: [
              createTreeNode({
                id: '4.1.1',
                info: {
                  name: 'NODE+4.1.1',
                },
              }),
              createTreeNode({
                id: '4.1.2',
                info: {
                  name: 'NODE+4.1.2',
                },
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

const rootNode = createTree()

const renderNode = (pointNode: HierarchyPointNode<TreeNodeInterface>) => {
  if (pointNode.data.id === '2') {
    return (
      <NodeContainer>
        <div>
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={
              <TreeNodeAvatar
                name='QQQQQQQQ QQQQQQQQ'
                src='./jacqueline-with-flowers-1954-square.jpg'
              />
            }
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
          <UserBadge
            name='QQQQQQQQ QQQQQQQQ'
            avatar={<TreeNodeAvatar name='QQQQQQQQ QQQQQQQQ' />}
          />
        </div>
      </NodeContainer>
    )
  }

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
      directionProps={{
        verticalMargin: 20,
        direction: 'horizontal',
      }}
    />
  </Container>
)

export default Example
```

### Compact tree

Example of a compact tree - one with only single node on each depth that has children

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import { TreeView, TreeNodeAvatar, Container, UserBadge } from '@toptal/picasso'
import type { HierarchyPointNode } from 'd3-hierarchy'
import styled from 'styled-components'
import { palette } from '@toptal/picasso-utils'

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
      name: 'NODE+NAME+1',
    },
    ...override,
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
      name: 'NODE-1',
    },
    children: [
      createTreeNode({
        id: getId(),
        info: {
          name: 'NODE-1-1',
        },
        children: [
          ...Array(3)
            .fill(undefined)
            .map((_, index) =>
              createTreeNode({
                id: getId(),
                info: {
                  name: `NODE-1-1-${index + 1}-before`,
                },
                children: [],
              })
            ),
          createTreeNode({
            id: getId(),
            info: {
              name: 'NODE-1-1-N',
            },
            children: Array(8)
              .fill(undefined)
              .map((_, index) =>
                createTreeNode({
                  id: getId(),
                  info: {
                    name: `NODE-1-1-1-${index + 1}`,
                  },
                  children: [],
                })
              ),
          }),
          ...Array(8)
            .fill(undefined)
            .map((_, index) =>
              createTreeNode({
                id: getId(),
                info: {
                  name: `NODE-1-1-${index + 1}-after`,
                },
                children: [],
              })
            ),
        ],
      }),
    ],
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
      directionProps={{
        verticalMargin: 20,
        horizontalMargin: 200,
        direction: 'horizontal',
        variant: 'compact',
      }}
    />
  </Container>
)

export default Example
```

### TreeNodeAvatar

A complementary component to render an avatar for a tree view node

```tsx
import React from 'react'
import { TreeNodeAvatar, Container, Typography } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar name='John Doe' size='xsmall' />
    </Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/128x128.jpg'
        size='small'
      />
    </Container>
    <Typography variant='heading' size='large'>
      objectFit
    </Typography>
    <Typography variant='heading' size='medium'>
      objectFit=contain (default)
    </Typography>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/88x128.jpg'
        size='small'
      />
    </Container>
    <Typography variant='heading' size='medium'>
      objectFit=cover
    </Typography>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        objectFit='cover'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        objectFit='cover'
        src='jacqueline/88x128.jpg'
        size='small'
      />
    </Container>
  </Container>
)

export default Example
```
