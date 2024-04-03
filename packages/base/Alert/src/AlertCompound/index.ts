import { Alert } from '../Alert'
import { AlertInline } from '../AlertInline'

type AlertCompoundType = typeof Alert & {
  Inline: typeof AlertInline
}

export const AlertCompound: AlertCompoundType = Object.assign(Alert, {
  Inline: AlertInline,
})
