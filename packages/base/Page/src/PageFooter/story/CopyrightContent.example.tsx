import React from 'react'
import { Page, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Page.Footer copyrightContent={<CopyrightContent />} />
  </div>
)

const CopyrightContent = () => (
  <>
    <Typography invert size='inherit'>
      © Copyright 2021 TopScreen
    </Typography>
  </>
)

export default Example
