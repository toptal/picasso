import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const Example = () => {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <Container flex gap='1rem'>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Regular</Typography>
        <div>
          <Tag
            icon={<Settings16 />}
            variant={selected ? 'green' : 'grey'}
            onClick={() => {
              setSelected(!selected)
            }}
          >
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Hover</Typography>
        <div>
          <Tag icon={<Settings16 />} hovered onSelect={noop}>
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Selected</Typography>
        <div>
          <Tag icon={<Settings16 />} variant='green' onSelect={noop}>
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Hover on Selected</Typography>
        <div>
          <Tag icon={<Settings16 />} hovered variant='green' onSelect={noop}>
            Label
          </Tag>
        </div>
      </Container>
    </Container>
  )
}

export default Example
