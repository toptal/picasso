import React from 'react'

import Loader from '../Loader'
import Spacer from '../../Spacer'

const LoaderControlledValueExample = () => (
  <div>
    <Loader label='50%' value={50} variant='static' />
    <Spacer bottom={2} />
    <Loader label='13%' value={13} variant='determinate' />
  </div>
)

export default LoaderControlledValueExample
