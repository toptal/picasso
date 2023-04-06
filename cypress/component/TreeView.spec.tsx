/* eslint-disable import/no-extraneous-dependencies */
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
import { useModal, palette } from '@toptal/picasso/utils'
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
      }),
      createTreeNode({
        id: '4',
        info: {
          name: 'NODE+4',
        },
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

const ModalExample = () => {
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

const component = 'TreeView'

describe('TreeView', () => {
  it('render with modal', () => {
    cy.mount(<ModalExample />)

    cy.getByTestId('open').realClick()

    cy.getByTestId('tree-dialog-content').should('be.visible')

    cy.getByRole('presentation').happoScreenshot({
      component,
      variant: 'with-modal/after-modal-opened',
    })
  })
})
