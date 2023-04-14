import Quill from 'quill'

const EmbedBlot = Quill.import('blots/embed')

export class EmojiBlot extends EmbedBlot {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(data: any) {
    console.log(data)
    const node = super.create(data)

    node.setAttribute('data-src', data.src)
    node.setAttribute('data-emoji-name', data.emojiId)
    node.setAttribute('src', data.src)
    node.setAttribute('width', data.width)
    node.setAttribute('height', data.height)
    node.setAttribute('style', data.style)
    console.log(node)

    return node
  }
  static value(domNode: {
    dataset: { src: string; width: number; height: number }
  }) {
    const { src, width, height } = domNode.dataset

    return { src, width, height }
  }
}

EmojiBlot.blotName = 'emojiBlot'
EmojiBlot.className = 'emoji-blot'
EmojiBlot.tagName = 'img'
