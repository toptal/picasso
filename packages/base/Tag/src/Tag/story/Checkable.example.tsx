import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_4, SPACING_2, noop } from '@toptal/picasso-utils'

const Example = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Container flex gap={SPACING_4}>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Regular</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            checked={checked}
            onChange={() => {
              setChecked(!checked)
            }}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Hovered</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Checked</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Hovered on Selected</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Disabled</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            hovered
            checked
            disabled
            onChange={noop}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
    </Container>
  )
}

export default Example
