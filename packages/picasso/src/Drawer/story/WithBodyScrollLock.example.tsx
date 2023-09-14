import { Button, Container, List, Drawer, Checkbox } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)
  const [maintainBodyScrollLock, setMaintainBodyScrollLock] = useState(true)

  return (
    <div>
      <Checkbox
        checked={maintainBodyScrollLock}
        onChange={(evt, val) => {
          setMaintainBodyScrollLock(val)
        }}
        label='Maintain body scroll lock'
      />
      <Container top={SPACING_4}>
        <Button data-testid='trigger' onClick={() => setOpen(!open)}>
          Show drawer
        </Button>
      </Container>
      <Drawer
        title='My Operational Issues'
        open={open}
        onClose={() => setOpen(false)}
        maintainBodyScrollLock={maintainBodyScrollLock}
      >
        <Container data-testid='content' padded={SPACING_6}>
          <List variant='ordered'>
            {Array(100)
              .fill(undefined)
              .map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <List.Item key={index}>Row {index}</List.Item>
              ))}
            <List.Item>Add at least 10 skills</List.Item>
            <List.Item>Set your age</List.Item>
          </List>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
