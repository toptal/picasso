import React from 'react'
import { Loader, Spacer } from '@toptal/picasso'

const LoaderSizesExample = () => (
  <div>
    <Loader label='small' size='small' />
    <Spacer bottom={2} />
    <Loader label='default' size='default' />
    <Spacer bottom={2} />
    <Loader label='large' size='large' />
  </div>
)

export default LoaderSizesExample
