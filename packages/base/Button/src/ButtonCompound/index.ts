import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { ButtonCircular } from '../ButtonCircular'
import { ButtonAction } from '../ButtonAction'
import { ButtonSplit } from '../ButtonSplit'
import { ButtonCheckbox } from '../ButtonCheckbox'
import { ButtonRadio } from '../ButtonRadio'

export const ButtonCompound = Object.assign(Button, {
  Group: ButtonGroup,
  Circular: ButtonCircular,
  Action: ButtonAction,
  Split: ButtonSplit,
  Checkbox: ButtonCheckbox,
  Radio: ButtonRadio,
})
