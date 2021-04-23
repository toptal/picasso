import React, { useState } from 'react'
import { Container, Radio } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Container style={{ width: '500px' }}>
      <Radio.Group
        name='variableName'
        onChange={(event: React.ChangeEvent<{ value: string }>) =>
          setValue(event.target.value)
        }
        horizontal
        small={4}
        value={value}
      >
        <Radio label='Radio 1' value='radio1' />
        <Radio label='Radio 2' value='radio2' />
        <Radio
          label={
            <TypographyOverflow>Radio 3 with some long text</TypographyOverflow>
          }
          value='radio3'
        />
        <Radio label='Radio 4' value='radio4' />
        <Radio label='Radio 5' value='radio5' />
        <Radio label='Radio 6' value='radio6' />
        <Radio label='Radio 7' value='radio7' />
        <Radio label='Radio 8' value='radio8' />
        <Radio label='Radio 9' value='radio9' />
      </Radio.Group>
    </Container>
  )
}

export default Example
