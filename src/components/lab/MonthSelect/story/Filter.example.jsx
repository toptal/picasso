import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { MonthSelect } from '@toptal/picasso/lab'

const FilterExample = () => {
  const onChange = e => {
    window.alert(e.target.value + ' is selected')
  }

  return (
    <div>
      <Container bottom='medium'>
        <Typography>From May to December</Typography>
        <MonthSelect
          width='auto'
          placeholder='Select month'
          onChange={onChange}
          from='5'
          to='12'
        />
      </Container>

      <Container bottom='medium'>
        <Typography>From January to May</Typography>
        <MonthSelect
          width='auto'
          placeholder='Select month'
          onChange={onChange}
          to='5'
        />
      </Container>
      <Container>
        <Typography>From August to December</Typography>
        <MonthSelect
          width='auto'
          placeholder='Select month'
          onChange={onChange}
          from='8'
        />
      </Container>
    </div>
  )
}

export default FilterExample
