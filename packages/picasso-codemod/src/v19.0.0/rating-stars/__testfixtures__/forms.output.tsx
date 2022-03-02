// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Form } from '@toptal/picasso-forms'

export const Foo = () => (
  <>
    <Form.Rating.Stars />
    <Form.Rating.Thumbs />
    <Form.Rating.Stars>Bar</Form.Rating.Stars>
  </>
)
