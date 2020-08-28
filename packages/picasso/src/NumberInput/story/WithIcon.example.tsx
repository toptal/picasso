import React, { useState, ChangeEventHandler } from 'react'
import { NumberInput, Container } from '@toptal/picasso'
import { ReferralBonus16 } from '@toptal/picasso/Icon'

const WithIconExample = () => {
  const [value, setValue] = useState('1')

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value)
  }

  return (
    <Container>
      <NumberInput
        value={value}
        onChange={handleChange}
        step='5'
        max='100'
        min='-100'
        icon={<ReferralBonus16 />}
      />
    </Container>
  )
}

export default WithIconExample
