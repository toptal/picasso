import React from 'react'
import { Link, Typography, Container } from '@toptal/picasso'
import { DetailedList } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Container style={{ maxWidth: 600 }}>
      <DetailedList striped>
        <DetailedList.Column>
          <DetailedList.Item label='Profile Type'>
            Product Manager
          </DetailedList.Item>
          <DetailedList.Item label='Email'>
            <Typography size='medium' noWrap>
              <Link variant='action'>rana-20a360a07ac9b7af@toptal.io</Link>
            </Typography>
          </DetailedList.Item>
          <DetailedList.Item label='Phone'>
            <Typography size='medium' noWrap>
              <Link variant='action'>680-938-5745</Link>
            </Typography>
          </DetailedList.Item>
          <DetailedList.Item label='Working status'>
            Not working
          </DetailedList.Item>
          <DetailedList.Item label='Availability'>
            <Typography color='green' weight='semibold' size='medium' noWrap>
              Product Manager Full-time (40 hours/week available out of 40
              hours/week) updated 1 day ago
            </Typography>
          </DetailedList.Item>
        </DetailedList.Column>
        <DetailedList.Column>
          <DetailedList.Item label='Toptal email'>
            rana-a576d349769a1e76@toptal.io
          </DetailedList.Item>
          <DetailedList.Item label='Slack'>
            <Typography size='medium' noWrap>
              <Link variant='action'>Queen Donnely</Link>
            </Typography>
          </DetailedList.Item>
          <DetailedList.Item label='Skype'>
            <Typography size='medium' noWrap>
              <Link variant='action'>queen_donnelly147061</Link>
            </Typography>
          </DetailedList.Item>
          <DetailedList.Item label='Allocated hours'>
            40 hours/week
          </DetailedList.Item>
        </DetailedList.Column>
      </DetailedList>
    </Container>
  )
}

export default Example
