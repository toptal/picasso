import React from 'react'
import { Button } from '@toptal/picasso'
import { Settings16, Settings24 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button icon={<Settings16 />} size='small'>
      Cog
    </Button>
    <Button icon={<Settings16 />}>Cog</Button>
    <Button icon={<Settings24 />} size='large'>
      Cog
    </Button>
    <Button icon={<Settings16 />} iconPosition='right' size='small'>
      Check
    </Button>
    <Button icon={<Settings16 />} iconPosition='right'>
      Check
    </Button>
    <Button icon={<Settings24 />} iconPosition='right' size='large'>
      Check
    </Button>
  </div>
)

export default Example
