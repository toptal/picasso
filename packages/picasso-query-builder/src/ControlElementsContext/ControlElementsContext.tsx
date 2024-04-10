import { getCompatContextProvider } from 'react-querybuilder'
import type {
  Controls,
  OperatorSelectorProps,
  ValueEditorProps,
  ValueSourceSelectorProps,
} from 'react-querybuilder'
import type { ComponentType } from 'react'

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
  valueEditor: ValueEditor as unknown as ComponentType<ValueEditorProps>,
  combinatorSelector: CombinatorSelector,
  fieldSelector: FieldSelector,
  operatorSelector:
    OperatorSelector as unknown as ComponentType<OperatorSelectorProps>,
  valueSourceSelector:
    Select as unknown as ComponentType<ValueSourceSelectorProps>,
}

export const ControlElementsContext = getCompatContextProvider({
  key: 'picasso',
  controlElements: picassoControlElements,
})
