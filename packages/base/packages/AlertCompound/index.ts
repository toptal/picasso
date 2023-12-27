/* eslint-disable import/no-extraneous-dependencies */
import Alert from '@toptal/picasso-alert'
import AlertInline from '@toptal/picasso-alert-inline'

export const AlertCompound = Object.assign(Alert, {
  Inline: AlertInline,
})
