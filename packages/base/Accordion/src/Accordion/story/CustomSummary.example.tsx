import React, { useState } from 'react'
import { Accordion, Typography, Button, Container, Link } from '@toptal/picasso'
import {
  SPACING_4,
  SPACING_6,
  SPACING_2,
  palette,
  Transitions,
} from '@toptal/picasso/utils'
import {
  ArrowDownMinor16,
  Drag16,
  Bell16,
  Time16,
  VideoOn16,
} from '@toptal/picasso/Icon'

const Summary = ({
  onClick,
  expanded,
}: {
  onClick: () => void
  expanded: boolean
}) => (
  <Container
    flex
    alignItems='center'
    justifyContent='space-between'
    bottom={SPACING_4}
    top={SPACING_4}
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
        data-testid='trigger'
      >
        {expanded ? 'Hide' : 'Show'}
      </Button>
      <Button.Circular variant='flat' icon={<Drag16 />} />
    </Container>
  </Container>
)

const InterviewCard = () => (
  <Container
    style={{ flex: 1, border: `1px solid ${palette.grey.light2}` }}
    flex
    data-testid='content'
  >
    <Container
      flex
      direction='column'
      padded={SPACING_6}
      alignItems='center'
      justifyContent='center'
    >
      <Typography weight='semibold' size='xsmall' color='black'>
        Fri
      </Typography>
      <Typography variant='heading' size='large'>
        18
      </Typography>
      <Typography weight='semibold' size='xsmall' color='black'>
        Jan
      </Typography>
    </Container>

    <div
      style={{
        width: '1px',
        backgroundColor: palette.grey.light2,
        margin: '1.5em 0',
      }}
    />

    <Container padded={SPACING_6} style={{ flex: 1 }}>
      <Container flex justifyContent='space-between' bottom={SPACING_2}>
        <Container>
          <Typography size='medium' as='span'>
            <Link href='#'>React Front End Developer</Link>
          </Typography>
          <Container left={SPACING_2} inline>
            <Typography size='medium' as='span'>
              with Walsh Group
            </Typography>
          </Container>
        </Container>

        <Container>
          <Bell16 />
          <Container left={SPACING_2} right={SPACING_4} inline>
            <Typography size='xsmall' as='span'>
              <Link href='#'>Add to calendar</Link>
            </Typography>
          </Container>
          <Button
            data-testid='start-onboarding'
            size='small'
            onClick={() => window.alert('Onboarding started')}
          >
            Start Interview Onboarding
          </Button>
        </Container>
      </Container>

      <Container flex justifyContent='space-between' alignItems='center'>
        <Container>
          <Container bottom={SPACING_2}>
            <Time16 />
            <Container left={SPACING_4} inline>
              <Typography size='medium' as='span'>
                07:00 PM – 07:30 PM (UTC+02:00) Europe – Belgrade
              </Typography>
            </Container>
          </Container>

          <Container>
            <VideoOn16 />
            <Container left={SPACING_4} right={SPACING_2} inline>
              <Typography size='medium' as='span'>
                Bluejeans Conference
              </Typography>
            </Container>
            <Typography size='xsmall' as='span'>
              <Link href='#'>Show URL</Link>
            </Typography>
          </Container>
        </Container>

        <Typography size='xsmall' align='right' style={{ width: '207px' }}>
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
        borders='none'
      />
    </div>
  )
}

export default Example
