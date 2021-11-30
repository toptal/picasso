import React from 'react'
import {
  Tag,
  Settings16,
  Container,
  Typography,
  Tooltip
} from '@toptal/picasso'

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

const Example = () => (
  <Container flex gap='small'>
    <Container flex direction='column' gap='xsmall'>
      <Typography>Regular</Typography>
      <div>
        <Tag>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='xsmall'>
      <Typography>With Icon</Typography>
      <div>
        <Tag icon={<Settings16 />}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='xsmall'>
      <Typography>With Remove</Typography>
      <div>
        <Tag onDelete={handleDelete}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap='xsmall'>
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
    <Container flex direction='column' gap='xsmall'>
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
    <Container flex direction='column' gap='xsmall'>
      <Typography>With Tooltip</Typography>
      <div>
        <Tooltip variant='light' interactive content='ssddssdsdsd'>
          <Tag>Label</Tag>
        </Tooltip>
      </div>
    </Container>
  </Container>
)

export default Example
