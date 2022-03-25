// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Input } from '@toptal/picasso'

const Example = () => (
  <div>
    <Input
      required
      name='status.firstName'
      label='First name'
      placeholder='e.g. Bruce'
      status='error'
    />
  </div>
)

export default Example
