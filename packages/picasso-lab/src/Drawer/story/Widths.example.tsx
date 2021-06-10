import { Container, List, Button } from '@toptal/picasso'
import { Drawer } from '@toptal/picasso-lab'
import React, { useState } from 'react'

type WidthType = 'narrow' | 'regular' | 'medium' | 'wide' | 'ultra-wide'

const types: WidthType[] = ['narrow', 'regular', 'medium', 'wide', 'ultra-wide']

const Example = () => {
  const [width, setWidth] = useState<WidthType>('narrow')
  const [open, setOpen] = useState(false)

  const handleClick = (type: WidthType) => {
    setWidth(type)
    setOpen(!open)
  }

  return (
    <div>
      {types.map(type => (
        <Button
          data-testid={`show-${type}`}
          onClick={() => handleClick(type)}
          key={type}
        >
          Show {type} drawer
        </Button>
      ))}
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
        width={width}
      >
        <Container data-testid='content' padded='medium'>
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
