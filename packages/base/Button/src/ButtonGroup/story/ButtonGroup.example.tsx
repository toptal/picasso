import React, { useState } from 'react'
import { Button } from '@toptal/picasso'

const Example = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <Button.Group>
        <Button.Group.Item active={active === 0} onClick={() => setActive(0)}>
          First
        </Button.Group.Item>
        <Button.Group.Item active={active === 1} onClick={() => setActive(1)}>
          Second
        </Button.Group.Item>
        <Button.Group.Item active={active === 2} onClick={() => setActive(2)}>
          Third
        </Button.Group.Item>
        <Button.Group.Item active={active === 3} onClick={() => setActive(3)}>
          Fourth
        </Button.Group.Item>
      </Button.Group>
    </div>
  )
}

export default Example
