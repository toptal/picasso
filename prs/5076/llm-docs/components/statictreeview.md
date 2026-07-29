# StaticTreeView

Allows rendering a static variant of tree view

## Props

### StaticTreeView

| Name | Type | Default | Description |
|------|------|---------|-------------|
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
import {
  TreeNodeAvatar,
  Container,
  UserBadge,
  StaticTreeView,
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
  <Container style={{ display: 'grid', placeItems: 'center' }}>
    <Container style={{ minHeight: '25rem', width: '100%', maxWidth: 1200 }}>
      <StaticTreeView data={rootNode} renderNode={renderNode} />
    </Container>
  </Container>
)

export default Example
```

### Horizontal Direction

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import {
  TreeNodeAvatar,
  Container,
  UserBadge,
  StaticTreeView,
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
  <Container style={{ display: 'grid', placeItems: 'center' }}>
    <Container style={{ minHeight: '25rem', width: '100%', maxWidth: 1200 }}>
      <StaticTreeView
        data={rootNode}
        renderNode={renderNode}
        directionProps={{
          verticalMargin: 20,
          direction: 'horizontal',
        }}
      />
    </Container>
  </Container>
)

export default Example
```

### Compact tree

Example of a compact tree - one with only single node on each depth that has children

```tsx
import React from 'react'
import type { TreeNodeInterface } from '@toptal/picasso'
import {
  TreeNodeAvatar,
  Container,
  UserBadge,
  StaticTreeView,
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
  <Container style={{ display: 'grid', placeItems: 'center' }}>
    <Container style={{ minHeight: '25rem', width: '100%', maxWidth: 1200 }}>
      <StaticTreeView
        data={rootNode}
        renderNode={renderNode}
        directionProps={{
          verticalMargin: 20,
          horizontalMargin: 200,
          direction: 'horizontal',
          variant: 'compact',
        }}
      />
    </Container>
  </Container>
)

export default Example
```
