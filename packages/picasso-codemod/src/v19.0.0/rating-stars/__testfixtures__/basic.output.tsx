// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Rating } from '@toptal/picasso'

export const Foo = () => (
  <>
    <Rating.Stars />
    <Rating.Thumbs />
    <Rating.Stars>Bar</Rating.Stars>
  </>
)
