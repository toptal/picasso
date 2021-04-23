import React from 'react'
import { Checkbox, Container } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Container style={{ width: '500px' }}>
      <Checkbox.Group horizontal small={4}>
        <Checkbox label='Checkbox 1' value='checkbox1' />
        <Checkbox label='Checkbox 2' value='checkbox2' />
        <Checkbox
          label={
            <TypographyOverflow>Radio 3 with some long text</TypographyOverflow>
          }
          value='checkbox3'
        />
        <Checkbox label='Checkbox 4' value='checkbox4' />
        <Checkbox label='Checkbox 5' value='checkbox5' />
        <Checkbox label='Checkbox 6' value='checkbox6' />
        <Checkbox label='Checkbox 7' value='checkbox7' />
        <Checkbox label='Checkbox 8' value='checkbox8' />
        <Checkbox label='Checkbox 9' value='checkbox9' />
      </Checkbox.Group>
    </Container>
  )
}

export default Example
