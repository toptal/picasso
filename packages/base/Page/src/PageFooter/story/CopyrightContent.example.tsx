import React from 'react'
import { Page, Typography } from '@toptal/picasso'

const Example = () => (
  <Page>
    <Page.Footer copyrightContent={<CopyrightContent />} />
  </Page>
)

const CopyrightContent = () => (
  <>
    <Typography invert size='inherit'>
      © Copyright 2021 TopScreen
    </Typography>
  </>
)

export default Example
