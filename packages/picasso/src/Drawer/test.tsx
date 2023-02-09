import React, { useState } from 'react'

import Drawer, { DrawerProps } from '../Drawer'
import Button from '../Button'
import Container from '../Container'
import List from '../List'
import { fireEvent, render } from '../test-utils'

const DrawerExample = ({
  onOpen,
  ...drawerProps
}: Partial<DrawerProps> & { open: boolean; onOpen: () => void }) => {
  return (
    <div style={{ height: '660px' }}>
      <Button data-testid='trigger' onClick={onOpen}>
        Show drawer
      </Button>
      <Drawer {...drawerProps}>
        <Container padded='medium'>
          <List variant='ordered'>
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

const TestDrawer = (props: Partial<DrawerProps>) => {
  const [open, setOpen] = useState(true)

  return <DrawerExample {...props} open={open} onOpen={() => setOpen(!open)} />
}

describe('Drawer', () => {
  it('triggers onClose when close button is clicked', () => {
    const handleClose = jest.fn()

    const { getByLabelText } = render(<TestDrawer onClose={handleClose} />)

    const closeButton = getByLabelText('Close drawer')

    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('triggers onClose when backdrop is clicked', () => {
    const handleClose = jest.fn()

    const { getByRole } = render(<TestDrawer onClose={handleClose} />)

    const backdrop = getByRole('presentation').firstChild

    fireEvent.click(backdrop!)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
