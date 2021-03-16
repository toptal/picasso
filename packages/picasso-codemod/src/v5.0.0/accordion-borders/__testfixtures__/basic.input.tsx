// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Accordion } from '@toptal/picasso'

export default () => (
  <>
    <Accordion content='Accordion content' bordered>
      Summary
    </Accordion>
    {/* eslint-disable-next-line react/jsx-boolean-value */}
    <Accordion content='Accordion content' bordered={true}>
      Summary
    </Accordion>
    <Accordion content='Accordion content' bordered={false}>
      Summary
    </Accordion>
    <Accordion content='Accordion content'>Summary</Accordion>
  </>
)
