export const updateDocumentTitle = api => () => {
  const storyData = api.getCurrentStoryData()

  document.title = `Picasso | ${storyData.name}`
}
