import { ButtonAction } from '../ButtonAction'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Action Button', 'Action Style Button.')
    .addExample('ButtonAction/story/Default.example.tsx', 'Default')
    .addExample('ButtonAction/story/States.example.tsx', {
      title: 'States',
      effect: async (testPage, makeScreenshot) => {
        const changeBackgroundStyle = `
          body {
            background: lightyellow;
          }
        `

        await testPage.addStyleTag({ content: changeBackgroundStyle })
        await makeScreenshot()
      }
    })
)

const componentDocs = PicassoBook.createComponentDocs(
  ButtonAction,
  'Button.Action'
)

export default {
  chapter,
  componentDocs
}
