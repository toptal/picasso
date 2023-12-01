/* eslint-disable import/no-extraneous-dependencies */
import { AVATAR_INITIALS_LIMIT } from './constants'

export default (fullName: string) => {
  return fullName
    .split(' ')
    .map(word => {
      if (word === '' || word.length <= 1) {
        return ''
      }

      return word[0]
    })
    .join('')
    .slice(0, AVATAR_INITIALS_LIMIT)
}
