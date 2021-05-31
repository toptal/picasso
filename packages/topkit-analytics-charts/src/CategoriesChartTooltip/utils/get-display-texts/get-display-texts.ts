import { Bar, Tooltips } from '../../../CategoriesChart/types'
import { getColor } from '../../../CategoriesChart/utils'

export type GetDisplayTextsParams = {
  currentData: Bar
  tooltips: Tooltips
  currentPayload: { name: string; user: number; team: number }
}

const getDisplayTexts = ({
  currentData,
  tooltips,
  currentPayload: { name, user, team }
}: GetDisplayTextsParams) => {
  const [
    { values: originalTeamValues },
    { values: originalUserValues }
  ] = currentData.values

  return {
    teamTexts: originalTeamValues
      .filter(({ value }) => !!value)
      .map(({ id, value }) => ({
        key: `team-${id}`,
        label: tooltips[name].team[id],
        value,
        color: getColor({
          dataKey: 'team',
          entry: { name, value: { user, team } }
        })
      })),
    userTexts: originalUserValues
      .filter(({ value }) => !!value)
      .map(({ id, value }) => ({
        key: `user-${id}`,
        label: tooltips[name].user[id],
        value,
        color: getColor({
          dataKey: 'user',
          entry: { name, value: { user, team } }
        })
      }))
  }
}

export default getDisplayTexts
