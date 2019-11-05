import { Item as AutocompleteItem } from '../Autocomplete'

export interface Item extends AutocompleteItem {
  value: string
  text: string
}
