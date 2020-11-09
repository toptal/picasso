import React, { useState } from 'react'
import { Link, Typography, Checkbox, Container } from '@toptal/picasso'
import { DetailedList } from '@toptal/picasso-lab'

const Example = () => {
  const [stripped, setStripped] = useState(false)

  return (
    <div>
      <Container left={0.5} bottom={1}>
        <Checkbox
          data-testid='trigger'
          onChange={() => setStripped(!stripped)}
          label='Stripped'
          checked={stripped}
        />
      </Container>

      <DetailedList
        items={[
          { label: 'Profile Type', value: 'Product Manager' },
          { label: 'Toptal email', value: 'rana-a576d349769a1e76@toptal.io' },
          {
            label: 'Email',
            value: (
              <Typography size='medium' noWrap>
                <Link variant='action'>rana-20a360a07ac9b7af@toptal.io</Link>
              </Typography>
            )
          },
          {
            label: 'Slack',
            value: (
              <Typography size='medium' noWrap>
                {' '}
                <Link variant='action'>Queen Donnely</Link>
              </Typography>
            )
          },
          {
            label: 'Phone',
            value: (
              <Typography size='medium' noWrap>
                <Link variant='action'>680-938-5745</Link>
              </Typography>
            )
          },
          {
            label: 'Skype',
            value: (
              <Typography size='medium' noWrap>
                <Link variant='action'>queen_donnelly147061</Link>
              </Typography>
            )
          },
          { label: 'Working status', value: 'Not working' },
          { label: 'Allocated hours', value: '40 hours/week' },
          {
            label: 'Availability',
            value: (
              <Typography color='green' weight='semibold' size='medium'>
                Product Manager Full-time (40 hours/week available out of 40
                hours/week) updated 1 day ago
              </Typography>
            )
          }
        ]}
        stripped={stripped}
      />
    </div>
  )
}

export default Example
