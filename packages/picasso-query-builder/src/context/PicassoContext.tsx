import type { Controls } from 'react-querybuilder'
import { getCompatContextProvider } from 'react-querybuilder'

import { AddGroupButton } from '../components/AddGroupButton/AddGroupButton'
import { AddRuleButton } from '../components/AddRuleButton/AddRuleButton'
import { CloneGroupButton } from '../components/CloneGroupButton/CloneGroupButton'
import { CloneRuleButton } from '../components/CloneRuleButton/CloneRuleButton'
import { RemoveGroupButton } from '../components/RemoveGroupButton/RemoveGroupButton'
import { RemoveRuleButton } from '../components/RemoveRuleButton/RemoveRuleButton'
import { ValueEditor } from '../components/ValueEditor/ValueEditor'
import { CombinatorSelector } from '../components/CombinatorSelector/CombinatorSelector'
import { Select } from '../components/Select/Select'
import OperatorSelector from '../components/OperatorSelector/OperatorSelector'
import FieldSelector from '../components/FieldSelector/FieldSelector'

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
