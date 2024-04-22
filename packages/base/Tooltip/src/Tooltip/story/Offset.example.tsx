import React from 'react'
import { Button, Container, Tooltip } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_6} left={SPACING_6}>
    <Tooltip
      interactive
      placement='right'
      offset={{
        left: SPACING_4,
      }}
      content='Right tooltip with left offset'
    >
      <Button>Right/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='right'
      offset={{
        top: SPACING_4,
      }}
      content='Right tooltip with top offset'
    >
      <Button>Right/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='left'
      offset={{
        left: SPACING_4,
      }}
      content='Left tooltip with left offset'
    >
      <Button>Left/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='left'
      offset={{
        top: SPACING_4,
      }}
      content='Left tooltip with top offset'
    >
      <Button>Left/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='bottom'
      offset={{
        top: SPACING_4,
      }}
      content='Bottom tooltip with top offset'
    >
      <Button>Bottom/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='bottom'
      offset={{
        left: SPACING_4,
      }}
      content='Bottom tooltip with left offset'
    >
      <Button>Bottom/Left</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='top'
      offset={{
        top: SPACING_4,
      }}
      content='Top tooltip with top offset'
    >
      <Button>Top/Top</Button>
    </Tooltip>
    <Tooltip
      interactive
      placement='top'
      offset={{
        left: SPACING_4,
      }}
      content='Top tooltip with left offset'
    >
      <Button>Top/Left</Button>
    </Tooltip>
  </Container>
)

export default Example
