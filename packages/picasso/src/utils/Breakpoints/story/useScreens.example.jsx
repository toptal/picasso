import React, { Fragment } from 'react'
import { useScreens } from '@toptal/picasso/utils'
import { Typography, Button } from '@toptal/picasso'

const Example = () => {
  const screens = useScreens()

  return (
    <Fragment>
      <Typography>
        The button below will use:
        <ul>
          <li>
            <strong>secondary-blue</strong> variant on small screens
          </li>
          <li>
            <strong>primary-green</strong> variant on large screens
          </li>
          <li>
            <strong>primary-blue</strong> for all other screens (the default
            value)
          </li>
        </ul>
      </Typography>

      <Button
        variant={screens(
          {
            small: 'secondary-blue',
            large: 'primary-green'
          },
          'primary-blue'
        )}
      >
        {screens(
          {
            small: 'small (secondary-blue)',
            large: 'large (primary-green)'
          },
          'default (primary-blue)'
        )}
      </Button>
    </Fragment>
  )
}

export default Example
