// eslint-disable-next-line no-promise-executor-return
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getFakeData = async () => {
  const teams = (await import("../../teams.json")).default

  await delay(200)

  return teams.map(team => {
    const count = team.members.length
    const lastOnlineIndex = Math.round(Math.random() * count)

    return {
      name: team.name,
      online: team.members.slice(0, lastOnlineIndex),
      offline: team.members.slice(lastOnlineIndex)
    }
  })
}
