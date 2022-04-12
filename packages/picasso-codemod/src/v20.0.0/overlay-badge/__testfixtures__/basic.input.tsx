// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { OverlayBadge } from '@toptal/picasso'

export const Foo = () => (
  <>
    <OverlayBadge size='small' variant='red' content='foo'>
      Text
    </OverlayBadge>
    <OverlayBadge size='medium' variant='white' content='99+'>
      <div>Text2</div>
    </OverlayBadge>
  </>
)
