const disableScalingOnNonPicassoMetaTags = () => {
  const nonPicassoMetaTags = document.querySelectorAll(
    'meta[name="viewport"]:not([data-picasso="true"])'
  )

  nonPicassoMetaTags.forEach(metaTag => {
    const content = metaTag.getAttribute('content') || ''

    if (content.includes('user-scalable=no')) return

    metaTag.setAttribute('content', [content, 'user-scalable=no'].join(', '))
  })
}

export default disableScalingOnNonPicassoMetaTags
