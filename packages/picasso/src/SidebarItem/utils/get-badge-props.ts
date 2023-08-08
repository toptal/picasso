import type { SidebarBadgeProps } from '../../SidebarItemContent'

const getBadgeProps = (badge?: number | SidebarBadgeProps) => {
  if (typeof badge === 'number') {
    return { content: badge }
  }

  return badge
}

export default getBadgeProps
