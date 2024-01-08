import type { SidebarTagProps } from '../../SidebarItemContent'

const getTagProps = (tag?: string | SidebarTagProps) => {
  if (typeof tag === 'string') {
    return { content: tag }
  }

  return tag
}

export default getTagProps
