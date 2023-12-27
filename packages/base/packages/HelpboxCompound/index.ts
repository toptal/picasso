/* eslint-disable import/no-extraneous-dependencies */
import Helpbox from '@toptal/picasso-helpbox'
import HelpboxActions from '@toptal/picasso-helpbox-actions'
import HelpboxContent from '@toptal/picasso-helpbox-content'
import HelpboxTitle from '@toptal/picasso-helpbox-title'

export const HelpboxCompound = Object.assign(Helpbox, {
  Title: HelpboxTitle,
  Content: HelpboxContent,
  Actions: HelpboxActions,
})
