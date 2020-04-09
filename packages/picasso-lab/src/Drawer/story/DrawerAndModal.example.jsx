import { Button, Container } from '@toptal/picasso'
import { Drawer, List } from '@toptal/picasso-lab'
import { useModals } from '@toptal/picasso/utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)
  const { showPrompt } = useModals()

  const showDrawer = () => {
    setOpen(!open)

    showPrompt({
      title: 'Test title',
      message: 'Test message',
      onSubmit: async () => {}
    })
  }

  return (
    <div>
      <Button onClick={showDrawer}>Show drawer</Button>
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
      >
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

export default Example
