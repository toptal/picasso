import React from 'react'
import { Input, Container, Tooltip } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

import type { Props } from '../Input'

const InputWrapper = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Input {...props} outlineRef={ref} />
))

const RefsExample = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Tooltip content='Tooltip has Input as a children' placement='right'>
          <Input placeholder='ref demo' />
        </Tooltip>
      </Container>
      <Container padded={SPACING_4}>
        <Tooltip
          content='Tooltip has InputWrapper as a children. The InputWrapper passes ref to outlineRef of the Input.'
          placement='right'
        >
          <InputWrapper placeholder='outlineRef demo' />
        </Tooltip>
      </Container>
    </Container>
  )
}

export default RefsExample
