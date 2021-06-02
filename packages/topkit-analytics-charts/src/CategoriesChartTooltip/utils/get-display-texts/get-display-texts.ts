import { DataItem, Value, TooltipMap } from '../../../CategoriesChart/types'
import { getColor } from '../../../CategoriesChart/utils'

type CurrentPayload = { name: string; user: number; team: number }

export type GetDisplayTextsParams = {
  currentData: DataItem
  tooltips: TooltipMap
  currentPayload: CurrentPayload
}

const getText = ({
  originalValues,
  currentPayload: { name, user, team },
  tooltips,
  dataKey
}: {
  originalValues: Value[]
  currentPayload: CurrentPayload
  tooltips: TooltipMap
  dataKey: string
}) =>
  originalValues
    .filter(({ value }) => !!value)
    .map(({ id, value }) => ({
      key: `${dataKey}-${id}`,
      label: tooltips[name][dataKey][id],
      value,
      color: getColor({
        dataKey,
        entry: { name, value: { user, team } }
      })
    }))

const getDisplayTexts = ({
  currentData,
  tooltips,
  currentPayload
}: GetDisplayTextsParams) => {
  const [
    { values: originalTeamValues },
    { values: originalUserValues }
  ] = currentData.values

  return {
    teamTexts: getText({
      originalValues: originalTeamValues,
      currentPayload,
      tooltips,
      dataKey: 'team'
    }),
    userTexts: getText({
      originalValues: originalUserValues,
      currentPayload,
      tooltips,
      dataKey: 'user'
    })
  }
}

export default getDisplayTexts
