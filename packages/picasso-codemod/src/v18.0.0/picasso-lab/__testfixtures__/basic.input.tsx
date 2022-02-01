// @ts-nocheck
import { Container } from '@toptal/picasso-lab'
import { Calendar } from '@toptal/picasso-lab/Calendar'

const foo = (res: string) => res

foo('@toptal/picasso-lab')
foo('@toptal/picasso-lab/Calendar')

export default () => (
  <>
    <Container />
    <Calendar />
  </>
)
