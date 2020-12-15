import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex>
      <div style={{ width: 300, marginTop: 100 }}>
        <TypographyOverflow data-testid='default-delay-tooltip'>
          Default delay. This typography is very long and therefore it
          overflows.
        </TypographyOverflow>
      </div>

      <Container left='large'>
        <div style={{ width: 300, marginTop: 100 }}>
          <TypographyOverflow
            tooltipDelay='long'
            data-testid='long-delay-tooltip'
          >
            Long delay. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </div>
      </Container>
    </Container>
  )
}

export default Example
