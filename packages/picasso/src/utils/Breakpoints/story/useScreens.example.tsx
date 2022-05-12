import React from 'react'
import { useScreens } from '@toptal/picasso/utils'
import { Typography, Button, ButtonVariantType } from '@toptal/picasso'

const Example = () => {
  const screens = useScreens<ButtonVariantType>()
  const screenTexts = useScreens<string>()

  return (
    <>
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
            small: 'secondary',
            large: 'positive'
          },
          'primary'
        )}
      >
        {screenTexts(
          {
            small: 'small (secondary)',
            large: 'large (positive)'
          },
          'default (primary)'
        )}
      </Button>
    </>
  )
}

export default Example
