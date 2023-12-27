/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { PublicProps } from './Notification'

export { default } from './Notification'
export type NotificationProps = OmitInternalProps<PublicProps>
export * from './Notification'
