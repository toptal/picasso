import Select from '../Select'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'Select',
  `Selects are interactive elements that prompt users to make selections
    or take actions from a set of list of available options.`
)

page.createTabChapter('Props').addComponentDocs({
  component: Select,
  name: 'Select',
  additionalDocs: {
    options: {
      type: {
        name: 'Option',
        description: `
{\n
  value: string\n
  text: string\n
}
          `
      }
    },
    multiple: {
      type: {
        name: 'boolean'
      }
    }
  }
})

page
  .createChapter()
  .addExample('Select/story/Default.example.tsx', {
    title: 'Default',
    effect: async (testPage, makeScreenshot) => {
      const hideInputCaretStyle = `
        input {
          caret-color: transparent !important;
        }
      `

      await testPage.addStyleTag({ content: hideInputCaretStyle })

      // open options list
      await testPage.click('input')
      await testPage.waitFor('div[role=tooltip]')

      await testPage.evaluate(() => {
        // select the last option in the list
        // which is half hidden by the scroll
        const lastHalfVisibleOptionSelector = 'li:nth-of-type(7)' // Option 7
        const lastHalfVisibleOption = document.querySelector(
          lastHalfVisibleOptionSelector
        )

        // when you hover this last partially shown option
        const mouseOverEvent = new MouseEvent('mouseover', {
          view: window,
          bubbles: true,
          cancelable: true
        })

        lastHalfVisibleOption.dispatchEvent(mouseOverEvent)
      })

      // the options list should slightly scroll to show the hovered option
      await makeScreenshot({
        isFullScreen: true
      })
    },
    takeScreenshot: false
  })
  .addExample('Select/story/Native.example.tsx', 'Native')
  .addExample('Select/story/SearchBehavior.example.tsx', {
    title: 'Search behavior',
    description: `
    Search is enabled when the number of options is greater or equal to \`searchThreshold\`.
      `
  }) // picasso-skip-visuals
  .addExample('Select/story/Disabled.example.tsx', 'Disabled')
  .addExample('Select/story/Error.example.tsx', 'Error')
  .addExample('Select/story/WithIcon.example.tsx', 'With Icon')
  .addExample('Select/story/WithDescription.example.tsx', {
    title: 'With Description',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"] input')
      await testPage.waitFor(100)
      await makeScreenshot({
        isFullScreen: true
      })
    },
    takeScreenshot: false
  })
  .addExample('Select/story/Loading.example.tsx', 'Loading')
  .addExample('Select/story/Sizes.example.tsx', 'Sizes')
  .addExample('Select/story/FullWidth.example.tsx', 'Full width')
  .addExample('Select/story/ShrinkWidth.example.tsx', 'Shrink width')
  .addExample('Select/story/MenuWidth.example.tsx', {
    title: 'Menu width',
    effect: async (testPage, makeScreenshot) => {
      const hideInputCaretStyle = `
        input {
          caret-color: transparent !important;
        }
      `

      await testPage.addStyleTag({ content: hideInputCaretStyle })

      await testPage.click('[data-testid="trigger"] input')
      await testPage.waitFor(50)
      await makeScreenshot({
        isFullScreen: true
      })
    },
    takeScreenshot: false
  })
  .addExample('Select/story/ChosenOption.example.tsx', {
    title: 'Chosen option',
    description:
      'Renders Select component with already chosen one of the options'
  })
  .addExample('Select/story/CustomOptions.example.tsx', {
    title: 'Custom options',
    description:
      'Options of the Select component could be not only text, but custom components'
  })
  .addExample('Select/story/CustomDisplayValue.example.tsx', {
    title: 'Custom display value',
    description: 'Display value of selected value in input can be customized'
  })
  .addExample('Select/story/Multiple.example.tsx', {
    title: 'Multiple options',
    description: 'Select component allows to select multiple options'
  })
  .addExample('Select/story/AutoFocus.example.tsx', {
    title: 'Auto focus',
    description:
      'Demonstrate auto focus capability by switching visibility of Select'
  }) // picasso-skip-visuals
  .addExample('Select/story/ResetButton.example.tsx', {
    title: 'With reset button',
    effect: async (testPage, makeScreenshot) => {
      await testPage.keyboard.press('Tab')

      await makeScreenshot()
    },
    takeScreenshot: false
  })
  .addExample('Select/story/Autofill.example.tsx', 'Disabling autofilling') // picasso-skip-visuals
