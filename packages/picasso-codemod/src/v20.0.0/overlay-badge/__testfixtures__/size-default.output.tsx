// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Badge } from '@toptal/picasso'

export const Foo = () => (
  <>
    <Badge size="medium" variant='red' content='foo'>
      Text
    </Badge>
    <Badge size='medium' variant='white' content='99+'>
      <div>Text2</div>
    </Badge>
  </>
)
