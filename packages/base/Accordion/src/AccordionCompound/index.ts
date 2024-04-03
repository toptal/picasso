import { Accordion, Details, Summary } from '../Accordion'

type AccordionCompoundType = typeof Accordion & {
  Summary: typeof Summary
  Details: typeof Details
}

export const AccordionCompound: AccordionCompoundType = Object.assign(
  Accordion,
  {
    Summary,
    Details,
  }
)

export default AccordionCompound
