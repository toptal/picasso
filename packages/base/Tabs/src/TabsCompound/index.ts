import { Tab } from '../Tab'
import { Tabs } from '../Tabs'

type TabsCompoundType = typeof Tabs & {
  Tab: typeof Tab
}

export const TabsCompound: TabsCompoundType = Object.assign(Tabs, {
  Tab,
})
