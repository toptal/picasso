import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import { Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Container top='small' bottom='large'>
      <Button>Normal</Button>
      <Button hovered>Hovered</Button>
      <Button focused>Focused</Button>
      <Button active>Active</Button>
      <Button loading>Loading</Button>
    </Container>
    <Container top='small' bottom='large'>
      <Button variant='primary-red'>Normal</Button>
      <Button hovered variant='primary-red'>
        Hovered
      </Button>
      <Button focused variant='primary-red'>
        Focused
      </Button>
      <Button active variant='primary-red'>
        Active
      </Button>
      <Button loading variant='primary-red'>
        Loading
      </Button>
    </Container>
    <Container top='small' bottom='large'>
      <Button variant='secondary-blue'>Normal</Button>
      <Button hovered variant='secondary-blue'>
        Hovered
      </Button>
      <Button focused variant='secondary-blue'>
        Focused
      </Button>
      <Button active variant='secondary-blue'>
        Active
      </Button>
      <Button loading variant='secondary-blue'>
        Loading
      </Button>
    </Container>
    <Container
      top='small'
      bottom='large'
      style={{ backgroundColor: palette.blue.main }}
      padded={0.5}
    >
      <Button variant='secondary-white'>Normal</Button>
      <Button hovered variant='secondary-white'>
        Hovered
      </Button>
      <Button focused variant='secondary-white'>
        Focused
      </Button>
      <Button active variant='secondary-white'>
        Active
      </Button>
      <Button loading variant='secondary-white'>
        Loading
      </Button>
    </Container>

    <Container top='small' bottom='large'>
      <Button circular icon={<Settings16 />} size='small' />
      <Button circular hovered icon={<Settings16 />} size='small' />
      <Button circular focused icon={<Settings16 />} size='small' />
      <Button circular active icon={<Settings16 />} size='small' />
      <Button circular loading icon={<Settings16 />} size='small' />
      <Button circular disabled icon={<Settings16 />} size='small' />
    </Container>

    <Container top='small' bottom='large'>
      <Button variant='flat' circular icon={<Settings16 />} size='small' />
      <Button
        variant='flat'
        circular
        hovered
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='flat'
        circular
        focused
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='flat'
        circular
        active
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='flat'
        circular
        loading
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='flat'
        circular
        disabled
        icon={<Settings16 />}
        size='small'
      />
    </Container>

    <Container
      top='small'
      bottom='large'
      style={{ backgroundColor: palette.blue.main }}
      padded={0.5}
    >
      <Button
        variant='transparent'
        circular
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='transparent'
        circular
        hovered
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='transparent'
        circular
        focused
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='transparent'
        circular
        active
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='transparent'
        circular
        loading
        icon={<Settings16 />}
        size='small'
      />
      <Button
        variant='transparent'
        circular
        disabled
        icon={<Settings16 />}
        size='small'
      />
    </Container>
  </div>
)

export default Example
