import React from 'react'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'

import LexicalEditorMaxIndentLevelPlugin from '../LexicalEditorMaxIndentLevelPlugin'

const LexicalListPlugin = () => (
  <>
    <ListPlugin />
    <TabIndentationPlugin />
    <LexicalEditorMaxIndentLevelPlugin maxDepth={5} />
  </>
)

export default LexicalListPlugin
