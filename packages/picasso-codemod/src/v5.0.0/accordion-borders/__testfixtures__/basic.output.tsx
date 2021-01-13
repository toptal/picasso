// @ts-nocheck
import React from 'react'
import { Accordion } from '@toptal/picasso'

export default () => (
  <>
    <Accordion content='Accordion content' borders='all'>
      Summary
    </Accordion>
    {/* eslint-disable-next-line react/jsx-boolean-value */}
    <Accordion content='Accordion content' borders='all'>
      Summary
    </Accordion>
    <Accordion content='Accordion content' borders='none'>
      Summary
    </Accordion>
    <Accordion content='Accordion content'>Summary</Accordion>
  </>
)
