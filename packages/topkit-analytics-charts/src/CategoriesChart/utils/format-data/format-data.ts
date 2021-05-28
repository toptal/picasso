import { Bar, Labels } from '../../types'

const sum = (values: number[]) =>
  values.reduce((total, value) => total + value, 0)

const formatData = (data: Bar[], labels: Labels) => {
  return data.map(({ id, values }) => {
    const [team, user] = values

    const sumTeam = sum(team.values.map(({ value }) => value))
    const sumUser = sum(user.values.map(({ value }) => value))

    return {
      name: id,
      label: labels[id],
      value: {
        team: sumTeam,
        user: sumUser
      }
    }
  })
}

export default formatData
