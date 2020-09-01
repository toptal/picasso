import React from 'react'
import { Container, Button, Tooltip, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showSuccess } = useNotifications()
  const handleClick = () => showSuccess('I was clicked')

  return (
    <div>
      <Typography variant='heading' size='small'>
        Disabled button with the tooltip:
      </Typography>
      <Container top='small' bottom='large'>
        <Button onClick={handleClick}>Enabled</Button>
        <Tooltip content='Action is disabled'>
          <Button disabled onClick={handleClick}>
            Disabled With Tooltip
          </Button>
        </Tooltip>
      </Container>

      <Typography variant='heading' size='small'>
        Disabled button with the tooltip inside the button group:
      </Typography>
      <Container top='small'>
        <Button.Group>
          <Button onClick={handleClick}>Enabled</Button>
          <Tooltip content='Action is disabled'>
            <Button disabled onClick={handleClick}>
              Disabled With Tooltip
            </Button>
          </Tooltip>
        </Button.Group>
      </Container>
    </div>
  )
}

export default Example
