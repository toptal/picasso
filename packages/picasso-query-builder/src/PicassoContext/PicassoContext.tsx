import type { Controls } from 'react-querybuilder'
import { getCompatContextProvider } from 'react-querybuilder'

import { AddGroupButton } from '../AddGroupButton/AddGroupButton'
import { AddRuleButton } from '../AddRuleButton/AddRuleButton'
import { CloneGroupButton } from '../CloneGroupButton/CloneGroupButton'
import { CloneRuleButton } from '../CloneRuleButton/CloneRuleButton'
import { RemoveGroupButton } from '../RemoveGroupButton/RemoveGroupButton'
import { RemoveRuleButton } from '../RemoveRuleButton/RemoveRuleButton'
import { ValueEditor } from '../ValueEditor/ValueEditor'
import { CombinatorSelector } from '../CombinatorSelector/CombinatorSelector'
import { Select } from '../Select/Select'
import OperatorSelector from '../OperatorSelector/OperatorSelector'
import FieldSelector from '../FieldSelector/FieldSelector'

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

export const PicassoContext = getCompatContextProvider({
  key: 'picasso',
  controlElements: picassoControlElements,
})
