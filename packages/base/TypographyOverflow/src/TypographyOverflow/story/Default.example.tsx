import React from 'react'
import { TypographyOverflow, Container } from '@toptal/picasso'
import { SPACING_1, SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const label =
    'This is a label, long enough to overflow the container and be truncated with an ellipsis.'
  const smallScreen = true
  const description =
    'This is a description, long enough to overflow the container and be truncated with an ellipsis.'

  return (
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      padded={SPACING_4}
      rounded
      data-testid='menu-widget-card-layout'
      style={{ maxWidth: '236px' }}
    >
      <Container
        flex
        alignItems='center'
        gap={SPACING_2}
        style={{ minWidth: 0 }}
      >
        <Container style={{ minWidth: 0 }}>
          <Container
            flex
            alignItems={description && smallScreen ? 'flex-start' : 'center'}
            direction={description && smallScreen ? 'column-reverse' : 'row'}
            gap={SPACING_2}
            bottom={description ? SPACING_1 : undefined}
          >
            <TypographyOverflow
              lines={smallScreen ? 2 : 1}
              size='medium'
              weight='semibold'
              color='black'
              data-testid='menu-widget-card-layout-label'
            >
              {label}
            </TypographyOverflow>
          </Container>

          {description && (
            <Container style={{ maxWidth: '236px' }}>
              <TypographyOverflow
                size='small'
                lines={smallScreen ? 2 : 1}
                data-testid='menu-widget-card-layout-description'
              >
                {description}
              </TypographyOverflow>
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default Example
