import React from 'react'
import { Input, Container, Tooltip } from '@toptal/picasso'

import { Props } from '../Input'

const InputWrapper = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Input
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    outlineRef={ref}
  />
))

const RefsExample = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Tooltip content='Tooltip has Input as a children' placement='right'>
          <Input placeholder='ref demo' />
        </Tooltip>
      </Container>
      <Container padded='small'>
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
