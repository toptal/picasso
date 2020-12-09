import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'

const MultilineExample = () => (
  <section>
    <OverviewBlock.Group>
      <OverviewBlock.Row>
        <OverviewBlock
          value='$26,125,123.70'
          label='Outstanding'
          variant='label-yellow'
        />
        <OverviewBlock
          value='$5,837,806.68'
          label='Overdue'
          variant='label-red'
        />
        <OverviewBlock
          value='$1,232,107.99'
          label='Disputed'
          variant='label-red'
        />
        <OverviewBlock
          value='$1,722,076.43'
          label='Incollections'
          variant='label-red'
        />
      </OverviewBlock.Row>
      <OverviewBlock.Row>
        <OverviewBlock
          value='$935,590.65'
          label='Written off'
          variant='label-red'
        />
        <OverviewBlock
          value='$5,758,716.46'
          label='Pending receipt'
          variant='label-blue'
        />
        <OverviewBlock
          value='$44,244,163.83'
          label='Credited'
          variant='label-yellow'
        />
        <OverviewBlock
          value='$585,895,606.35'
          label='Paid'
          variant='label-green'
        />
      </OverviewBlock.Row>
    </OverviewBlock.Group>
  </section>
)

export default MultilineExample
