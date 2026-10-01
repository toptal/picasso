export type HourCycle = 12 | 24

const PROBE_CLASS_NAME =
  'fixed top-0 left-0 invisible pointer-events-none h-auto p-0 border-0'

// A stretched segment makes the whole field taller, which tells whether the browser rendered it
const SEGMENT_CLASS_NAMES = {
  hour: '[&::-webkit-datetime-edit-hour-field]:inline-block [&::-webkit-datetime-edit-hour-field]:h-[6.25rem]',
  ampm: '[&::-webkit-datetime-edit-ampm-field]:inline-block [&::-webkit-datetime-edit-ampm-field]:h-[6.25rem]',
}

const measureProbe = (segmentClassName = '') => {
  const probe = document.createElement('input')

  probe.type = 'time'
  probe.tabIndex = -1
  probe.setAttribute('aria-hidden', 'true')
  probe.className = `${PROBE_CLASS_NAME} ${segmentClassName}`

  document.body.appendChild(probe)

  const height = probe.offsetHeight

  probe.remove()

  return height
}

// The native field follows the operating system's 12/24-hour setting, which
// `Intl` does not see, so the field itself is the only reliable source
const getNativeFieldHourCycle = (): HourCycle | undefined => {
  if (typeof document === 'undefined') {
    return undefined
  }

  const stretchedHeight = measureProbe() * 2
  const rendersSegment = (segment: keyof typeof SEGMENT_CLASS_NAMES) =>
    measureProbe(SEGMENT_CLASS_NAMES[segment]) > stretchedHeight

  if (!rendersSegment('hour')) {
    return undefined
  }

  return rendersSegment('ampm') ? 12 : 24
}

const getLocaleHourCycle = (locale?: string): HourCycle => {
  const { hour12 } = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
  }).resolvedOptions()

  return hour12 ? 12 : 24
}

export const getHourCycle = (locale?: string): HourCycle =>
  getNativeFieldHourCycle() ?? getLocaleHourCycle(locale)
