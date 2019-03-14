import { waitForElements } from '../helpers'

const scrollTo = (section, container) => {
  const sectionContainer = section.closest('.section-container')

  if (!sectionContainer) {
    console.warn('Can not find .section-container of the section to scroll to')
    return
  }

  const scrollToPosition = sectionContainer.getBoundingClientRect().top
  container.scrollTo(0, scrollToPosition)
}

const highlightSection = section => {
  const sectionContainer = section.closest('.section-container')

  if (!sectionContainer) {
    console.warn('Can not find .section-container of the section to highlight')
    return
  }

  sectionContainer.classList.add('section-container--highlight')
}

export const scheduleWork = async () => {
  const hash = document.location.hash
  if (!hash) {
    return
  }

  const iframeWindow = document.getElementById('storybook-preview-iframe')
  const jumpToSectionId = hash.replace('#', '')
  const [section] = await waitForElements(
    '#' + jumpToSectionId,
    5000,
    iframeWindow.contentDocument
  )

  if (!section) {
    console.warn(
      `Can not find the section to highlight for sectionId - ${jumpToSectionId}`
    )
    return
  }

  scrollTo(section, iframeWindow.contentWindow)
  highlightSection(section)
}
