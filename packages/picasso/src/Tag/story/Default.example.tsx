import React from 'react'
import { Tag, Settings16, Container, Typography } from '@toptal/picasso'

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

const Example = () => (
  <Container flex gap='1rem'>
    <Container flex direction='column' gap='0.5rem'>
      <Typography>Regular</Typography>
      <div>
        <Tag>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='0.5rem'>
      <Typography>With Icon</Typography>
      <div>
        <Tag icon={<Settings16 />}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='0.5rem'>
      <Typography>With Remove</Typography>
      <div>
        <Tag onDelete={handleDelete}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='0.5rem'>
      <Typography>Disabled</Typography>
      <div>
        <Tag disabled>Label</Tag>
      </div>
      <div>
        <Tag disabled icon={<Settings16 />}>
          Label
        </Tag>
      </div>
      <div>
        <Tag
          disabled
          icon={<Settings16 />}
          endAdornment={<Tag.Connection>0</Tag.Connection>}
        >
          Label
        </Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='0.5rem'>
      <Typography>With Connection</Typography>
      <div>
        <Tag
          icon={<Settings16 />}
          endAdornment={<Tag.Connection>0</Tag.Connection>}
        >
          Label
        </Tag>
      </div>
    </Container>
  </Container>
)

export default Example
