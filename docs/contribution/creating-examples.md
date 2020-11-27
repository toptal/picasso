# Writing Storybook stories

To provide better a visual experience to end users and simplify workflow with creating storybook stories, we completely dropped the original API from storybook for creating stories. 

One of the main reasons was that the code wasn’t DRY, it required a lot of boilerplate and you are not able to provide _pretty_ examples to end users. 

To help you creating sample examples you can leverage our scaffolding tool `yarn generate:example` which will scaffold skeleton of an example story.

## PicassoBook
`PicassoBook` is our own API for writing Storybook stories. It is a simple chain API builder which collects all metadata for creating the following important things:

### Generating new Page inside documentation (Story Book).

```jsx
const page = PicassoBook
  .section('Components')
  .createPage(
    'Component',
    'Description of component'
  )
```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L7](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L7)

### Generating automatic PropsTable from the passed component through AST parsing.

```jsx
page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Component,
    name: 'Component'
  })
```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L13](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L13)

### Extending default capability of Storybook where you can specify only one example per component.

```jsx
import PicassoBook from '~/.storybook/components/PicassoBook'

import buttonGroupStory from '@components/ButtonGroup/story'

page.createChapter(...).addComponentDocs(buttonGroupStory.componentDocs)

```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L23](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L23)

### Grouping related components to a single Page inside the documentation (`Button`, `Button.Group`)

```jsx
page.connect(buttonGroupStory.chapter)
```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L47](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L47)

### Generating screenshots automatically based on provided examples

```jsx
page.createChapter(...).addExample('Component/story/Default.example.jsx') // this is all you need to do, live code will be screenshoted and compared inside CI automatically
```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L27](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L27)

## Showing separate Live editor for examples and keep examples separated from story definition. 

```jsx
page.createChapter(...).addExample('Component/story/Default.example.jsx') // this is all you need to do, live code editor will be automatically injected to the page
```

💡 ***TIP:*** You can see real example here [src/components/Button/story/index.jsx#L27](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx#L27)

### PicassoBook.Page

`Page` is the main building component which is composed of the following parts

* Title
* Description
* Props Table
* Chapters
  * Text
  * TabChapters
    * ComponentDocs
  * Examples

Page holds all the necessary metadata for generating full documentation page. 

Example of how to compose a page can be found at [src/components/Button/story/index.jsx](https://github.com/toptal/picasso/blob/master/src/components/Button/story/index.jsx)

## Examples
As we created own renderer for examples and Live editor for them, we are able to separate all examples to separate files and the full content of this example is always shown inside the editor. 

We want to make these examples as clean and as nice as possible, their purpose is not just to “render” documentation example, but the more important purpose is to let people easily copy paste sources of examples and use them. In consideration of that, we always need to think of what to put to examples and what not. If you see that some component is complex try to simplify it or omit some logic. In consideration of that, we always need to think about what to put or omit from example.

### DOs and DON’Ts inside examples

#### DOs
* Create simple and readable examples, which can be simply copied/pasted to the project 'as it is'
* Name all components inside examples with meaningful names
* Pay attention to code styling
* Create examples for all possible states inherited from props, they are not only used for the documentation but also for visual tests
* Try to avoid using stateful components, use hooks if you need to have state
* Try to show only one meaningful feature per example
* The `Default` example is needed to show the minimum component setup to be used

#### DON’Ts
* Don’t introduce crazy helpers inside examples instead list all implementation variants by hand

* Don’t abstract any helpers for generating props (e.g `createButtonVariant`) but write every variation by hand

~~bad_example.jsx~~
```jsx
const createButton = (variant) => (<Button variant={variant} >{variant}</Button>)

const Example = () => {
  return (
    <div>
      {createButton('primary')}
      {createButton('secondary')}
    </div>
  )
}

```

**good_example.jsx**
```jsx
const Example = () => {
  return (
    <div>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
    </div>
  )
}

```

* Don’t create large examples which are requiring a lot of cleaning after copy pasting
* Don’t hide any implementation details
* Don’t create variables unless it is critically necessary for examples to be run. (e.g. don’t extract `style={style}` rather list everything manually so it can be easily copy pasted to other application
