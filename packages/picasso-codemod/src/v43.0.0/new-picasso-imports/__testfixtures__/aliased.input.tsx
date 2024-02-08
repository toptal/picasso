// eslint-disable-file
// Direct default import from Icon file
import CheckSvg from '@toptal/picasso/Icon/Check24'
// Named import from sub-directory
import { Container as Box } from '@toptal/picasso/Container'
// Aliased type import
import type { Thing as Hello } from '@toptal/picasso/Autocomplete'
// Named type from utils
import type { Transitions } from '@toptal/picasso/utils'


import React from 'react'

const Example = () => {
  return (
    <Box>
      <CheckSvg />
    </Box>
  )
}
