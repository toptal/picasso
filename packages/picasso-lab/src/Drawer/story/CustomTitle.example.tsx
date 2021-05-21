import { Button, Typography, Container, List } from '@toptal/picasso'
import { Drawer } from '@toptal/picasso-lab'
import React, { useState } from 'react'

const Title = () => (
  <Container flex alignItems='center' padded='small'>
    <Typography>This Drawer has a custom title</Typography>
    <Button size='small'>OK!</Button>
  </Container>
)

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer title={<Title />} open={open} onClose={() => setOpen(false)}>
        <Container data-testid='content' padded='small'>
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
