import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { screen } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './ApplicationUpdateNotificationActions'
import { ApplicationUpdateNotificationActions } from './ApplicationUpdateNotificationActions'
import Button from '../Button'

const renderApplicationUpdateNotificationActions = (
  props: OmitInternalProps<Props> = { children: null }
) => render(<ApplicationUpdateNotificationActions {...props} />)

describe('ApplicationUpdateNotificationActions', () => {
  describe('when passing children as prop', () => {
    it('renders children', () => {
      const updateNowButtonTestId = 'btn-update-now'

      renderApplicationUpdateNotificationActions({
        children: [
          <Button
            key='btn-update-now'
            variant='secondary'
            data-testid='btn-update-now'
            onClick={() => console.log('Update Now')}
          >
            Update Now
          </Button>,
        ],
      })
      expect(screen.getByTestId(updateNowButtonTestId)).toBeInTheDocument()
    })
  })
})
