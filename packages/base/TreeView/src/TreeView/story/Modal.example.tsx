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
