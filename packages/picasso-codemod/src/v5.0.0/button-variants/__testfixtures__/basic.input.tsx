// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Button } from '@toptal/picasso'

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

    <Button variant='transparent-white' />
    <Button variant='transparent-white'>Transparent White</Button>
    <Button variant='transparent-blue'>Transparent Blue</Button>
    <Button variant='transparent-green'>Transparent Green</Button>

    <Button circular />
    <Button circular variant='transparent-blue' />
  </div>
)

export default Example
