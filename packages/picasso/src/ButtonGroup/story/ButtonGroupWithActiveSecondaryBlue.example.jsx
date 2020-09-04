import React, { useState } from 'react'
import { Button } from '@toptal/picasso'

const Example = () => {
  const [active, setActive] = useState(1)

  return (
    <div>
      <Button.Group>
        <Button
          variant='secondary'
          active={active === 0}
          onClick={() => setActive(0)}
        >
          First
        </Button>
        <Button
          variant='secondary'
          active={active === 1}
          onClick={() => setActive(1)}
        >
          Second
        </Button>
        <Button
          variant='secondary'
          active={active === 2}
          onClick={() => setActive(2)}
        >
          Third
        </Button>
        <Button
          variant='secondary'
          active={active === 3}
          onClick={() => setActive(3)}
        >
          Fourth
        </Button>
      </Button.Group>
    </div>
  )
}

export default Example
