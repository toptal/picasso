import type { makeStyles } from '@material-ui/core/styles'
import type { EditorThemeClasses } from 'lexical'

type Props = {
  typographyClassNames: string
  // ClassNameMap is not exported from @material-ui/core
  classes: ReturnType<ReturnType<typeof makeStyles>>
}

export const createLexicalTheme = ({
  typographyClassNames,
  classes,
}: Props) => {
  const indentLevels = Array.from(
    { length: 5 },
    (_, index) => `indent-level-${index + 1}`
  )

  const theme: EditorThemeClasses = {
    root: typographyClassNames,
    paragraph: classes.paragraph,
    list: {
      listitem: classes.listItem,
      nested: {
        listitem: 'nested-list-item',
      },
      olDepth: indentLevels,
      ulDepth: indentLevels,
      ul: classes.ul,
      ol: classes.ol,
    },
  }

  return theme
}
