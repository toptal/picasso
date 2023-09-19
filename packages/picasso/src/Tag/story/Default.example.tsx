import React from 'react'
import {
  Tag,
  Settings16,
  Container,
  Typography,
  Tooltip,
} from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso/utils'

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>Regular</Typography>
      <div>
        <Tag>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Icon</Typography>
      <div>
        <Tag icon={<Settings16 />}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Remove</Typography>
      <div>
        <Tag onDelete={handleDelete}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
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
    <Container flex direction='column' gap={SPACING_2}>
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
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Tooltip</Typography>
      <div>
        <Tooltip interactive content='ssddssdsdsd'>
          <Tag>Label</Tag>
        </Tooltip>
      </div>
    </Container>
  </Container>
)

export default Example
