import { Button, Typography, Container, List, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Title = () => (
  <Container flex alignItems='center' padded={SPACING_4}>
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
        <Container data-testid='content' padded={SPACING_4}>
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
