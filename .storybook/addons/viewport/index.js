const disableScalingOnNonHelmetMetaTags = () => {
  const nonHelmetMetaTags = document.querySelectorAll(
    'meta[name="viewport"]:not([data-react-helmet="true"])'
  )

  nonHelmetMetaTags.forEach(metaTag => {
    const content = metaTag.getAttribute('content') || ''

    if (content.includes('user-scalable=no')) return

    metaTag.setAttribute('content', [content, 'user-scalable=no'].join(', '))
  })
}

export default disableScalingOnNonHelmetMetaTags
