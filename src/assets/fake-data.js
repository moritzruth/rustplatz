// eslint-disable-next-line no-promise-executor-return
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getFakeData = async () => {
  const teams = (await import("../../teams.json")).default

  await delay(1200)

  return {
    teams: teams.map(team => {
      const count = team.members.length
      const lastOnlineIndex = Math.round(Math.random() * count)
      // Members with the same twitch name can theoretically be split on online and offline
      // (which will not happen with the real data)

      return {
        ...team,
        online: team.members.slice(0, lastOnlineIndex),
        offline: team.members.slice(lastOnlineIndex)
      }
    }),
    // totalViewers: Math.floor(Math.random() * 100000) + 50001
    totalViewers: 999999
    // totalViewers: 0
  }
}
