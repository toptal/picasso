import { Button, Container, List } from '@toptal/picasso'
import { Drawer } from '@toptal/picasso-lab'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useState } from 'react'

const Example = () => {
  const { showSuccess } = useNotifications()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(!open)
    showSuccess("That's one small step for a man, one giant leap for mankind.")
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
