import React, { cloneElement } from 'react'

import { isRTEPluginElement, RTEPluginMeta } from '../../../plugins/api'
import { LinkPlugin } from '../../../plugins'
import type { EditorPlugin } from '../..'

export const useComponentPlugins = (plugins: EditorPlugin[]) => {
  const mappedPlugins: EditorPlugin[] = plugins.map(plugin => {
    switch (plugin) {
      case 'link':
        return <LinkPlugin />

      default:
        return plugin
    }
  })

  const componentPlugins = mappedPlugins.filter(isRTEPluginElement)

  const lexicalNodes = componentPlugins.flatMap(
    plugin => plugin.type[RTEPluginMeta]?.lexical?.nodes ?? []
  )

  return {
    lexicalNodes,
    componentPlugins: componentPlugins.map(el =>
      cloneElement(el, { key: el.type[RTEPluginMeta]?.name })
    ),
  }
}
