import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { screen } from '@testing-library/react'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './ApplicationUpdateNotificationActions'
import { ApplicationUpdateNotificationActions } from './ApplicationUpdateNotificationActions'

const renderApplicationUpdateNotificationActions = (
  props: OmitInternalProps<Props> = { children: null }
) => render(<ApplicationUpdateNotificationActions {...props} />)

describe('ApplicationUpdateNotificationActions', () => {
  describe('when passing children as prop', () => {
    it('renders children', () => {
      const updateNowButtonTestId = 'btn-update-now'

      renderApplicationUpdateNotificationActions({
        children: [
          <button
            key='btn-update-now'
            data-testid='btn-update-now'
            onClick={() => console.log('Update Now')}
          >
            Update Now
          </button>,
        ],
      })
      expect(screen.getByTestId(updateNowButtonTestId)).toBeInTheDocument()
    })
  })
})
