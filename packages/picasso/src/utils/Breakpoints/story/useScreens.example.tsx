import React from 'react'
import { useScreens } from '@toptal/picasso/utils'
import type { ButtonVariantType } from '@toptal/picasso'
import { Typography, Button, Container } from '@toptal/picasso'

const Example = () => {
  const screens = useScreens<ButtonVariantType>()
  const screenTexts = useScreens<string>()

  return (
    <>
      <Container bottom={2}>
        <Typography variant='heading' size='medium'>
          Current screen breakpoint:{' '}
          {screenTexts({
            xs: 'xs',
            sm: 'sm',
            md: 'md',
            lg: 'lg',
            xl: 'xl',
          })}
        </Typography>
      </Container>
      <Typography as='span'>
        The button below will use:
        <ul>
          <li>
            <strong>secondary</strong> variant on small screens
          </li>
          <li>
            <strong>positive</strong> variant on large screens
          </li>
          <li>
            <strong>primary</strong> for all other screens (the default value)
          </li>
        </ul>
      </Typography>

      <Button
        variant={screens(
          {
            sm: 'secondary',
            lg: 'positive',
          },
          'primary'
        )}
      >
        {screenTexts(
          {
            sm: 'small (secondary)',
            lg: 'large (positive)',
          },
          'default (primary)'
        )}
      </Button>
    </>
  )
}

export default Example
