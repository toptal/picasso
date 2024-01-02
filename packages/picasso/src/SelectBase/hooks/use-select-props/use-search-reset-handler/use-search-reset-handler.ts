import type { ValueType, UseSelectProps } from '../../../types'

const useSearchResetHandler =
  <T extends ValueType, M extends boolean = false>({
    selectState: { setFilterOptionsValue },
  }: UseSelectProps<T, M>) =>
  () =>
    setFilterOptionsValue('')

export default useSearchResetHandler
