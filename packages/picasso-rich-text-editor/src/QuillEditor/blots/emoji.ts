import Quill from 'quill'

const EmbedBlot = Quill.import('blots/embed')

export class EmojiBlot extends EmbedBlot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(data: any) {
    const node = super.create(data)

    node.setAttribute('data-src', data.src)
    node.setAttribute('data-emoji-name', data.emojiId)
    node.setAttribute('src', data.src)
    node.setAttribute('class', 'emoji-icon')

    return node
  }

  static value(domNode: { dataset: { src: string } }) {
    const { src } = domNode.dataset

    return { src }
  }
}

EmojiBlot.blotName = 'emojiBlot'
EmojiBlot.className = 'emoji-blot'
EmojiBlot.tagName = 'img'
