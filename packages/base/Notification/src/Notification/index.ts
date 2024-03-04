import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { PublicProps } from './Notification'

export { default as Notification } from './Notification'
export type NotificationProps = OmitInternalProps<PublicProps>
export * from './Notification'
