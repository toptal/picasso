import { Helpbox } from '../Helpbox'
import { HelpboxActions } from '../HelpboxActions'
import { HelpboxContent } from '../HelpboxContent'
import { HelpboxTitle } from '../HelpboxTitle'

type HelpboxCompoundType = typeof Helpbox & {
  Title: typeof HelpboxTitle
  Content: typeof HelpboxContent
  Actions: typeof HelpboxActions
}

export const HelpboxCompound: HelpboxCompoundType = Object.assign(Helpbox, {
  Title: HelpboxTitle,
  Content: HelpboxContent,
  Actions: HelpboxActions,
})
