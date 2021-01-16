const { ClientCredentialsAuthProvider } = require("twitch-auth")
const { ApiClient } = require("twitch")
const rawTeams = require("../teams.json")

const RUST_GAME_ID = 263490

async function run() {
  const client = new ApiClient({
    authProvider: new ClientCredentialsAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET)
  })

  const streamers = rawTeams
    .flatMap(team => team.members)
    .map(member => Array.isArray(member) ? member[1] : member)

  const rustStreamsIterator = await client.helix.streams.getStreamsPaginated({
    userName: streamers,
    game: RUST_GAME_ID.toString()
  })

  const rustStreams = []
  for await (const stream of rustStreamsIterator) {
    rustStreams.push(stream)
  }

  const activeStreamers = new Set(streamers.filter(name => rustStreams.some(stream => stream.userDisplayName === name)))

  const teams = []
  for (const team of rawTeams) {
    teams.push({
      name: team.name,
      online: team.members.filter(member => activeStreamers.has(Array.isArray(member) ? member[1] : member)),
      offline: team.members.filter(member => !activeStreamers.has(Array.isArray(member) ? member[1] : member))
    })
  }

  return teams
}

exports.handler = async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(await run()),
    headers: {
      "Cache-Control": "public, max-age=60"
    }
  }
}
