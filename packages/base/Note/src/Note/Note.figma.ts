// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=280-13514
// source=https://github.com/toptal/picasso/blob/master/packages/base/Note/src/NoteCompound/index.ts
// component=Note

import figma from 'figma'

const hasContent =
  figma.selectedInstance.getPropertyValue('Variant') === 'Content'

export default {
  id: 'Note',
  imports: ["import { Note } from '@toptal/picasso'"],
  example: hasContent
    ? figma.code`<Note>
  <Note.Title>Title</Note.Title>
  <Note.Subtitle>Subtitle</Note.Subtitle>
  <Note.Content>Content</Note.Content>
</Note>`
    : figma.code`<Note>
  <Note.Content>Custom slot content</Note.Content>
</Note>`,
} satisfies CodeConnectTemplate
