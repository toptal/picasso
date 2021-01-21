const SPECIAL_CHARS_OR_SPACES = /[^\w]+/gi

export interface UrlOptions {
  host: string
  kind: string
  type: string
  section?: string
}

export const normalize = (name: string) =>
  name
    .replace(SPECIAL_CHARS_OR_SPACES, '-')
    .trim()
    .toLowerCase()

export const getHost = () => {
  const { location } = window.parent.document

  return location.origin + location.pathname
}

export const generateUrl = ({ host, kind, type, section }: UrlOptions) => {
  const encodedKind = normalize(kind)
  const encodedType = normalize(type)

  const url = `${host}?path=/story/${encodedKind}-${encodedType}--${encodedType}`

  if (!section) {
    return url
  }

  return `${url}#${normalize(section)}`
}

export const generateIframeUrl = ({ host, kind, type }: UrlOptions) => {
  const encodedKind = normalize(kind)
  const encodedType = normalize(type)

  return `${host}/iframe.html?id=${encodedKind}--${encodedType}`
}
