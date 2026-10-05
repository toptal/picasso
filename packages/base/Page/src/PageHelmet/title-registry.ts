/**
 * The title props of every mounted `Page.Helmet`, in mount order, so that on
 * React 19 they merge into one title the way react-helmet-async's provider
 * merges them on React 17 and 18: the innermost `title`, formatted with the
 * innermost `titleTemplate`, or else the innermost `defaultTitle`. It is
 * module-wide, like the one document whose title it sets.
 */
export interface TitleEntry {
  title?: string
  titleTemplate?: string
  defaultTitle?: string
}

const entries: TitleEntry[] = []
const listeners = new Set<() => void>()

const notify = () => listeners.forEach(listener => listener())

export const subscribe = (listener: () => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export const register = (entry: TitleEntry) => {
  entries.push(entry)
  notify()

  return () => {
    entries.splice(entries.indexOf(entry), 1)
    notify()
  }
}

export const update = (entry: TitleEntry, next: TitleEntry) => {
  if (
    entry.title === next.title &&
    entry.titleTemplate === next.titleTemplate &&
    entry.defaultTitle === next.defaultTitle
  ) {
    return
  }

  Object.assign(entry, next)
  notify()
}

const findInnermost = (key: keyof TitleEntry) =>
  [...entries].reverse().find(entry => entry[key] !== undefined)

/** The title this helmet renders, if any: only one helmet renders one */
export const resolveTitle = (entry: TitleEntry): string | undefined => {
  const titled = findInnermost('title')

  if (titled) {
    if (titled !== entry) {
      return undefined
    }

    const title = titled.title ?? ''
    const template = findInnermost('titleTemplate')?.titleTemplate

    return template ? template.replace(/%s/g, title) : title
  }

  return findInnermost('defaultTitle') === entry
    ? entry.defaultTitle
    : undefined
}
