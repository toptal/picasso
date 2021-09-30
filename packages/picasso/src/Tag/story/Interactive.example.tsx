import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'

const Example = () => {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <Container flex gap='1rem'>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Regular</Typography>
        <div>
          <Tag
            icon={<Settings16 color='darkGrey' />}
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
          <Tag
            icon={<Settings16 color='darkGrey' />}
            hovered
            onClick={() => {}}
          >
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Selected</Typography>
        <div>
          <Tag
            icon={<Settings16 color='darkGrey' />}
            variant='positive'
            onClick={() => {}}
          >
            Label
          </Tag>
        </div>
      </Container>
      <Container flex direction='column' gap='0.5rem'>
        <Typography>Hover on Selected</Typography>
        <div>
          <Tag
            icon={<Settings16 color='darkGrey' />}
            hovered
            variant='positive'
            onClick={() => {}}
          >
            Label
          </Tag>
        </div>
      </Container>
    </Container>
  )
}

export default Example
