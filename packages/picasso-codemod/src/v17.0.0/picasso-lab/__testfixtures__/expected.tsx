// @ts-nocheck
import { Container } from '@toptal/picasso'
import { Calendar } from '@toptal/picasso/Calendar'

const foo = (res: string) => res

foo('@toptal/picasso')
foo('@toptal/picasso/Calendar')

export default () => (
  <>
    <Container />
    <Calendar />
  </>
)
