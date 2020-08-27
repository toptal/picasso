import React, { useState } from 'react'
import { DatePicker } from '@toptal/picasso-lab'
import { Container, Typography } from '@toptal/picasso'

const SizesExample = () => {
  const [value, setValue] = useState(new Date('2015-12-12T16:00:00'))

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Small
        </Typography>
        <Container top='small' bottom='small'>
          <DatePicker
            value={value}
            size='small'
            placeholder='Please select date...'
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setValue(date as Date)
            }}
          />
        </Container>
      </Container>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Medium (default)
        </Typography>
        <Container top='small' bottom='small'>
          <DatePicker
            value={value}
            size='medium'
            placeholder='Please select date...'
            onChange={date => {
              /* eslint-disable-next-line no-console */
              console.log('selected date is: ', date)

              setValue(date as Date)
            }}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default SizesExample
