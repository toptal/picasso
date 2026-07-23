import figma from '@figma/code-connect'
import React from 'react'
import { Quote } from '@toptal/picasso'

const QUOTE_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=274-11848'

figma.connect(Quote, QUOTE_URL, {
  example: () => <Quote>Quoted text goes here.</Quote>,
})
