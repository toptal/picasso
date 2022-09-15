import { create } from '@storybook/theming'
import { addons } from '@storybook/addons'
import lunr from 'lunr'

const theme = create({
  base: 'light',
  brandTitle: 'Picasso',
  brandImage:
    'https://user-images.githubusercontent.com/437214/54037817-b4da1800-41c7-11e9-81f5-59ed43e38500.png',
})

addons.setConfig({
  showPanel: false,
  theme,
})

const init = async () => {
  const t0 = performance.now()

  const response = await fetch('./full-text-index.json')
  const data = await response.json()

  window.indexData = data

  console.log('DATA:', data)

  window.lunrIndex = lunr(function () {
    this.ref('file')
    this.field('text')
    this.metadataWhitelist = ['position']

    data.forEach(function (item) {
      this.add(item)
    }, this)
  })

  const t1 = performance.now()

  console.log(t1 - t0, ' milliseconds for calculating full-text search index')
}

init()

function debounced(delay, fn) {
  let timerId
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

setTimeout(() => {
  const sidebar = document.getElementsByClassName('sidebar-container')[0]

  const input = document.createElement('input')
  input.setAttribute('placeholder', 'full-text search...')
  input.style = `
    margin: 16px;
  `

  const searchResultsNode = document.createElement('div')
  searchResultsNode.style = `
    padding: 16px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 16px;'
  `

  const onInputHandler = event => {
    searchResultsNode.innerHTML = '<div />'

    console.log('input value:', event.target.value)

    if (event.target.value) {
      const searchResults = window.lunrIndex.search(event.target.value)
      searchResults.map(result => {
        const textResult = window.indexData.find(r => r.file === result.ref)

        searchResultsNode.innerHTML += `
          <div>
            <div>
              ${result.ref} score: ${result.score}
            </div>

            <div>
              ${textResult?.text}
            </div>
          </div>
        `
      })
    }
  }
  const onInputHandlerDebounced = debounced(200, onInputHandler)

  input.addEventListener('input', onInputHandlerDebounced)

  sidebar.prepend(input)
  input.parentNode.insertBefore(searchResultsNode, input.nextSibling)
}, 2000)
