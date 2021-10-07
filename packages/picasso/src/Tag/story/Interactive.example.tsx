import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'

const noop = () => {}

const Example = () => {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <Container flex gap='1rem'>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Regular</Typography>
        <div>
          <Tag
            icon={<Settings16 />}
            variant={selected ? 'positive' : 'secondary'}
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
          <Tag icon={<Settings16 />} hovered onClick={noop}>
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Selected</Typography>
        <div>
          <Tag icon={<Settings16 />} variant='positive' onClick={noop}>
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Hover on Selected</Typography>
        <div>
          <Tag icon={<Settings16 />} hovered variant='positive' onClick={noop}>
            Label
          </Tag>
        </div>
      </Container>
    </Container>
  )
}

export default Example
