// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Form } from '@toptal/picasso-forms'

export const Foo = () => (
  <>
    <Form.Rating />
    <Form.Rating.Thumbs />
    <Form.Rating>Bar</Form.Rating>
  </>
)
