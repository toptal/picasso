import type { ReactElement } from 'react'
import React, { cloneElement } from 'react'

import { isRTEPluginElement, RTEPluginMeta } from '../../../plugins/api'
import type { RTEPlugin } from '../../../plugins/api'
import { LinkPlugin, EmojiPlugin } from '../../../plugins'
import type { EditorPlugin } from '../..'
import type { CustomEmojiGroup } from '../../../plugins/EmojiPlugin'

const uniquePlugins = () => {
  const plugins = new Set()

  return ({ type }: ReactElement<unknown, RTEPlugin<unknown>>): boolean => {
    if (plugins.has(type)) {
      return false
    }

    plugins.add(type)

    return true
  }
}

export const useComponentPlugins = (
  plugins: EditorPlugin[],
  customEmojis: CustomEmojiGroup[] | undefined
) => {
  const mappedPlugins: EditorPlugin[] = plugins
    .map(plugin => {
      switch (plugin) {
        case 'link':
          return <LinkPlugin />
        case 'emoji':
          return <EmojiPlugin customEmojis={customEmojis} />

        default:
          return plugin
      }
    })
    .filter(uniquePlugins())

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
