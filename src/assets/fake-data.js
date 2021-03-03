// eslint-disable-next-line no-promise-executor-return
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let i = 0
export const getFakeData = async () => {
  const { teams } = await import("../../data.json")

  // await delay(1200)
  i++

  return {
    teams: teams.map(team => {
      const count = team.members.length
      const lastOnlineIndex = Math.round(Math.random() * count)
      // Members with the same twitch name can theoretically be split on online and offline
      // (which will not happen with the real data)

      return {
        id: team.id,
        name: team.name,
        live: team.members.slice(0, lastOnlineIndex),
        offline: team.members.slice(lastOnlineIndex),
        nonStreamers: team.nonStreamerMembers ?? []
      }
    }),
    ended: i === 2,
    // totalViewers: Math.floor(Math.random() * 100000) + 50001
    totalViewers: 999999
    // totalViewers: 0
  }
}
