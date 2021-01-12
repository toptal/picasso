// @ts-nocheck
import React from 'react'
import { Button } from '@toptal/picasso'
import { Twitter24, Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button variant='primary'>Primary Red</Button>
    <Button variant='negative'>Primary Red</Button>
    <Button variant='positive'>Primary Green</Button>

    <Button variant='secondary'>Secondary Blue</Button>
    <Button variant='secondary'>Secondary Red</Button>
    <Button variant='secondary'>Secondary Green</Button>
    <Button variant='transparent'>Secondary White</Button>

    <Button variant='secondary'>Flat</Button>
    <Button variant='transparent'>Flat White</Button>

    <Button variant='transparent' icon={<Twitter24 />} />
    <Button variant='transparent' icon={<Twitter24 />} />
    <Button variant='transparent' icon={<Twitter24 />} />

    <Button.Circular icon={<Settings16 />} />
  </div>
)

export default Example
