import { PasswordInput } from '../PasswordInput'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Forms').createPage(
  'PasswordInput',
  `Input component for passwords
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: PasswordInput, name: 'PasswordInput' })

page
  .createChapter()
  .addExample(
    'PasswordInput/story/Default.example.tsx',
    'Default',
    'base/PasswordInput'
  )
  .addExample(
    'PasswordInput/story/Disabled.example.tsx',
    'Disabled',
    'base/PasswordInput'
  )
  .addExample(
    'PasswordInput/story/Status.example.tsx',
    'Status',
    'base/PasswordInput'
  )
