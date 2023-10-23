import React from 'react'
import { render, TestingPicasso } from '@toptal/picasso/test-utils'

import type { Props } from './TimelineRow'
import TimelineRow from './TimelineRow'

const renderTimelineRow = ({ classes }: Partial<Props>) =>
  render(
    <TestingPicasso>
      <TimelineRow date='Jan 15, 2027' classes={classes}>
        Row content
      </TimelineRow>
    </TestingPicasso>
  )

describe('TimelineRow', () => {
  describe('when dateColumn class name is provided', () => {
    it('adds it to date column CSS classes', () => {
      const DATE_COLUMN_CLASS = 'date-column-class'
      const { container } = renderTimelineRow({
        classes: {
          dateColumn: DATE_COLUMN_CLASS,
        },
      })

      expect(container.getElementsByClassName(DATE_COLUMN_CLASS)).toHaveLength(
        1
      )
    })
  })
})
