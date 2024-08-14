import { twJoin } from '@toptal/picasso-tailwind-merge'

import { SavingState } from './FormAutoSaveIndicator'

const getVisibilityClass = ({
  savingState,
}: Pick<GetVisibilityClassOptions, 'savingState'>): string =>
  savingState === SavingState.Saved ? 'visible' : 'invisible'

type GetVisibilityClassOptions = {
  savingState: SavingState
}

export const getStyles = ({ savingState }: GetVisibilityClassOptions): string =>
  twJoin('mt-[0.25em] mb-[0.25em]', getVisibilityClass({ savingState }))
