import React, { useState } from 'react'
import { Link, Typography, Checkbox, Container } from '@toptal/picasso'
import { DetailedList } from '@toptal/picasso-lab'

const Example = () => {
  const [stripped, setStripped] = useState(false)

  return (
    <div>
      <Container left={0.5} bottom={1}>
        <Checkbox
          data-test-id='trigger'
          onChange={() => setStripped(!stripped)}
          label='Stripped'
          checked={stripped}
        />
      </Container>

      <DetailedList stripped={stripped}>
        <DetailedList.Item label='Profile Type' value='Product Manager' />
        <DetailedList.Item
          label='Toptal email'
          value='rana-a576d349769a1e76@toptal.io'
        />
        <DetailedList.Item
          label='Email'
          value={<Link variant='action'>rana-20a360a07ac9b7af@toptal.io</Link>}
        />
        <DetailedList.Item
          label='Slack'
          value={<Link variant='action'>Queen Donnely</Link>}
        />
        <DetailedList.Item
          label='Phone'
          value={<Link variant='action'>680-938-5745</Link>}
        />
        <DetailedList.Item
          label='Skype'
          value={<Link variant='action'>queen_donnelly147061</Link>}
        />
        <DetailedList.Item label='Working status' value='Not working' />
        <DetailedList.Item label='Allocated hours' value='40 hours/week' />
        <DetailedList.Item
          label='Availability'
          value={
            <Typography color='green' weight='semibold'>
              Product Manager Full-time (40 hours/week available out of 40
              hours/week) updated 1 day ago
            </Typography>
          }
        />
      </DetailedList>
    </div>
  )
}

export default Example
