import React, { useState } from 'react'
import { Accordion, Typography, Button, Container, Link } from '@toptal/picasso'
import {
  ArrowDownMinor16,
  Drag16,
  Bell16,
  Time16,
  VideoOn16
} from '@toptal/picasso/Icon'
import { palette, Transitions } from '@toptal/picasso/utils'

const Summary = ({
  onClick,
  expanded
}: {
  onClick: () => void
  expanded: boolean
}) => (
  <Container
    flex
    alignItems='center'
    justifyContent='space-between'
    bottom='small'
    top='small'
  >
    <Typography variant='heading' size='medium'>
      Upcoming interviews (1)
    </Typography>
    <Container>
      <Button
        variant='secondary'
        icon={
          <Transitions.Rotate180 on={expanded}>
            <ArrowDownMinor16 />
          </Transitions.Rotate180>
        }
        onClick={onClick}
      >
        {expanded ? 'Hide' : 'Show'}
      </Button>
      <Button.Circular variant='transparent' icon={<Drag16 />} />
    </Container>
  </Container>
)

const InterviewCard = () => (
  <Container
    style={{ flex: 1, border: `1px solid ${palette.grey.light}` }}
    flex
  >
    <Container
      flex
      direction='column'
      padded='medium'
      alignItems='center'
      justifyContent='center'
    >
      <Typography weight='semibold' size='small' color='black'>
        Fri
      </Typography>
      <Typography variant='heading' size='large'>
        18
      </Typography>
      <Typography weight='semibold' size='small' color='black'>
        Jan
      </Typography>
    </Container>

    <div
      style={{
        width: '1px',
        backgroundColor: palette.grey.light,
        margin: '1.5em 0'
      }}
    />

    <Container padded='medium' style={{ flex: 1 }}>
      <Container flex justifyContent='space-between' bottom='xsmall'>
        <Container>
          <Typography size='medium' as='span'>
            <Link href='#'>React Front End Developer</Link>
          </Typography>
          <Container left='xsmall' inline>
            <Typography size='medium' as='span'>
              with Walsh Group
            </Typography>
          </Container>
        </Container>

        <Container>
          <Bell16 />
          <Container left='xsmall' right='small' inline>
            <Typography size='small' as='span'>
              <Link href='#'>Add to calendar</Link>
            </Typography>
          </Container>
          <Button size='small'>Start Interview Onboarding</Button>
        </Container>
      </Container>

      <Container flex justifyContent='space-between' alignItems='center'>
        <Container>
          <Container bottom='xsmall'>
            <Time16 />
            <Container left='small' inline>
              <Typography size='medium' as='span'>
                07:00 PM – 07:30 PM (UTC+02:00) Europe – Belgrade
              </Typography>
            </Container>
          </Container>

          <Container>
            <VideoOn16 />
            <Container left='small' right='xsmall' inline>
              <Typography size='medium' as='span'>
                Bluejeans Conference
              </Typography>
            </Container>
            <Typography size='small' as='span'>
              <Link href='#'>Show URL</Link>
            </Typography>
          </Container>
        </Container>

        <Typography size='small' align='right' style={{ width: '207px' }}>
          If anything comes prior to the interview, please{' '}
          <Link href='#'>reschedule.</Link>
        </Typography>
      </Container>
    </Container>
  </Container>
)

const Example = () => {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  return (
    <div style={{ width: '910px' }}>
      <Summary onClick={handleClick} expanded={expanded} />
      <Accordion
        content={<InterviewCard />}
        expanded={expanded}
        bordered={false}
      />
    </div>
  )
}

export default Example
