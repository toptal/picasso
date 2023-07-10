import React from 'react'
import { Calendar } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const WithWeekStartsOnSundayExample = () => {
  return <Calendar onChange={noop} weekStartsOn={0} />
}

export default WithWeekStartsOnSundayExample
