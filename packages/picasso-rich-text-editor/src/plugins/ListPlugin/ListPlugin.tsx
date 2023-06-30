import React from 'react'
import { ListPlugin as LexicalListPlugin } from '@lexical/react/LexicalListPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'

import EditorMaxIndentLevelPlugin from '../EditorMaxIndentLevelPlugin'

const ListPlugin = () => (
  <>
    <LexicalListPlugin />
    <TabIndentationPlugin />
    <EditorMaxIndentLevelPlugin maxDepth={5} />
  </>
)

export default ListPlugin
