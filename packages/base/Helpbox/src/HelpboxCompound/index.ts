import { Helpbox } from '../Helpbox'
import { HelpboxActions } from '../HelpboxActions'
import { HelpboxContent } from '../HelpboxContent'
import { HelpboxTitle } from '../HelpboxTitle'

export const HelpboxCompound = Object.assign(Helpbox, {
  Title: HelpboxTitle,
  Content: HelpboxContent,
  Actions: HelpboxActions,
})
