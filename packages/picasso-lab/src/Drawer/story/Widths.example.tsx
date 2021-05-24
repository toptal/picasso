import { Button, Container, List } from '@toptal/picasso'
import { Drawer } from '@toptal/picasso-lab'
import React, { useState } from 'react'

type WidthType = 'regular' | 'wide'

const Example = () => {
  const [width, setWidth] = useState<WidthType>('regular')
  const [open, setOpen] = useState(false)

  const handleOnButtonClick = (width: WidthType) => {
    setWidth(width)
    setOpen(!open)
  }

  return (
    <div>
      <Button
        data-testid='show-regular'
        onClick={() => handleOnButtonClick('regular')}
      >
        Show regular drawer
      </Button>
      <Button
        data-testid='show-wide'
        onClick={() => handleOnButtonClick('wide')}
      >
        Show wide drawer
      </Button>
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
