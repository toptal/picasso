import { Grid } from '../Grid'
import { GridItem } from '../GridItem'

type GridCompoundType = typeof Grid & {
  Item: typeof GridItem
}

export const GridCompound: GridCompoundType = Object.assign(Grid, {
  Item: GridItem,
})
