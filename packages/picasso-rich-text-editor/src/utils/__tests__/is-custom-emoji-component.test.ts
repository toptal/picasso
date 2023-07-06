import { isCustomEmojiComponent } from '..'

describe('isCustomEmojiComponent', () => {
  describe('when component props are specific to Emoji', () => {
    it('returns true', () => {
      const props = {
        'data-src': 'test',
        'data-emoji-name': 'test',
      }

      expect(isCustomEmojiComponent(props)).toBeTruthy()
    })
  })

  describe('when component props are not specific to Emoji', () => {
    it('returns false', () => {
      const props = {}

      expect(isCustomEmojiComponent(props)).toBeFalsy()
    })
  })
})
