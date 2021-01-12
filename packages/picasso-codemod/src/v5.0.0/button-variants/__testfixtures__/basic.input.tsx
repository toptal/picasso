// @ts-nocheck
import React from 'react'
import { Button } from '@toptal/picasso'
import { Twitter24, Settings16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Button variant='primary-blue'>Primary Red</Button>
    <Button variant='primary-red'>Primary Red</Button>
    <Button variant='primary-green'>Primary Green</Button>

    <Button variant='secondary-blue'>Secondary Blue</Button>
    <Button variant='secondary-red'>Secondary Red</Button>
    <Button variant='secondary-green'>Secondary Green</Button>
    <Button variant='secondary-white'>Secondary White</Button>

    <Button variant='flat'>Flat</Button>
    <Button variant='flat-white'>Flat White</Button>

    <Button variant='transparent-white' icon={<Twitter24 />} />
    <Button variant='transparent-blue' icon={<Twitter24 />} />
    <Button variant='transparent-green' icon={<Twitter24 />} />

    <Button icon={<Settings16 />} circular />
  </div>
)

export default Example
