import type { Controls } from 'react-querybuilder'
import { getCompatContextProvider } from 'react-querybuilder'

import { AddGroupButton } from '../AddGroupButton'
import { AddRuleButton } from '../AddRuleButton'
import { CloneGroupButton } from '../CloneGroupButton'
import { CloneRuleButton } from '../CloneRuleButton'
import { RemoveGroupButton } from '../RemoveGroupButton'
import { RemoveRuleButton } from '../RemoveRuleButton'
import { ValueEditor } from '../ValueEditor'
import { CombinatorSelector } from '../CombinatorSelector'
import { Select } from '../Select'
import { OperatorSelector } from '../OperatorSelector'
import { FieldSelector } from '../FieldSelector'

export const picassoControlElements: Partial<Controls> = {
  addGroupAction: AddGroupButton,
  addRuleAction: AddRuleButton,
  cloneGroupAction: CloneGroupButton,
  cloneRuleAction: CloneRuleButton,
  removeGroupAction: RemoveGroupButton,
  removeRuleAction: RemoveRuleButton,
  valueEditor: ValueEditor,
  combinatorSelector: CombinatorSelector,
  fieldSelector: FieldSelector,
  operatorSelector: OperatorSelector,
  valueSourceSelector: Select,
}

export const ControlElementsContext = getCompatContextProvider({
  key: 'picasso',
  controlElements: picassoControlElements,
})
