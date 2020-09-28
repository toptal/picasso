import { OmitInternalProps } from '@toptal/picasso-shared'

import { PublicProps } from './Notification'

export { default } from './Notification'
export type NotificationProps = OmitInternalProps<PublicProps>
export * from './Notification'
