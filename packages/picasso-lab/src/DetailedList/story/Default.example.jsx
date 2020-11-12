import React from 'react'
import { Link, Typography, Container } from '@toptal/picasso'
import { DetailedList } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Container>
      <DetailedList>
        <DetailedList.Column>
          <DetailedList.Item label='Profile Type' value='Product Manager' />
          <DetailedList.Item
            label='Email'
            value={
              <Typography size='medium' noWrap>
                <Link variant='action'>rana-20a360a07ac9b7af@toptal.io</Link>
              </Typography>
            }
          />
          <DetailedList.Item
            label='Phone'
            value={
              <Typography size='medium' noWrap>
                <Link variant='action'>680-938-5745</Link>
              </Typography>
            }
          />
          <DetailedList.Item label='Working status' value='Not working' />
          <DetailedList.Item
            label='Availability'
            value={
              <Typography color='green' weight='semibold' size='medium' noWrap>
                Product Manager Full-time (40 hours/week available out of 40
                hours/week) updated 1 day ago
              </Typography>
            }
          />
        </DetailedList.Column>
        <DetailedList.Column>
          <DetailedList.Item
            label='Toptal email'
            value='rana-a576d349769a1e76@toptal.io'
          />
          <DetailedList.Item
            label='Slack'
            value={
              <Typography size='medium' noWrap>
                <Link variant='action'>Queen Donnely</Link>
              </Typography>
            }
          />
          <DetailedList.Item
            label='Skype'
            value={
              <Typography size='medium' noWrap>
                <Link variant='action'>queen_donnelly147061</Link>
              </Typography>
            }
          />
          <DetailedList.Item label='Allocated hours' value='40 hours/week' />
        </DetailedList.Column>
      </DetailedList>
    </Container>
  )
}

export default Example
