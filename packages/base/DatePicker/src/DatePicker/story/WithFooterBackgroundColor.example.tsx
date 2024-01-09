import React, { useState } from 'react'
import {
  Chat16,
  Container,
  DatePicker,
  Link,
  Typography,
} from '@toptal/picasso'
import { SPACING_2, palette } from '@toptal/picasso-utils'

const WithFooterBackgroundColorRendering = () => {
  const [datepickerValue, setDatepickerValue] = useState<Date>()

  return (
    <div style={{ height: '50vh' }}>
      <DatePicker
        value={datepickerValue}
        onChange={date => {
          setDatepickerValue(date as Date)
        }}
        footer={
          <Container flex>
            <Container right={SPACING_2}>
              {' '}
              <Chat16 />{' '}
            </Container>
            <Container>
              <Typography size='small'>
                <Link href='#'>Got a question on end date? Talk to us</Link>
              </Typography>
            </Container>
          </Container>
        }
        footerBackgroundColor={palette.grey.lighter}
      />
    </div>
  )
}

export default WithFooterBackgroundColorRendering
