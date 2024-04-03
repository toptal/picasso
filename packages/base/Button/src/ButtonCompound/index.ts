import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { ButtonCircular } from '../ButtonCircular'
import { ButtonAction } from '../ButtonAction'
import { ButtonSplit } from '../ButtonSplit'
import { ButtonCheckbox } from '../ButtonCheckbox'
import { ButtonRadio } from '../ButtonRadio'

type ButtonCompoundType = typeof Button & {
  Group: typeof ButtonGroup
  Circular: typeof ButtonCircular
  Action: typeof ButtonAction
  Split: typeof ButtonSplit
  Checkbox: typeof ButtonCheckbox
  Radio: typeof ButtonRadio
}

export const ButtonCompound: ButtonCompoundType = Object.assign(Button, {
  Group: ButtonGroup,
  Circular: ButtonCircular,
  Action: ButtonAction,
  Split: ButtonSplit,
  Checkbox: ButtonCheckbox,
  Radio: ButtonRadio,
})
