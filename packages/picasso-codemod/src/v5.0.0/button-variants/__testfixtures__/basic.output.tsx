// @ts-nocheck
import React from 'react'
import { Button } from '@toptal/picasso'

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

    <Button.Action />
    <Button.Action>Transparent White</Button.Action>
    <Button.Action>Transparent Blue</Button.Action>
    <Button.Action>Transparent Green</Button.Action>

    <Button.Circular />
    <Button.Circular variant='flat' />
  </div>
)

export default Example
