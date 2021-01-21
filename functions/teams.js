const { ClientCredentialsAuthProvider } = require("twitch-auth")
const { ApiClient } = require("twitch")
const fetch = require("node-fetch")
const rawTeams = require("../teams.json")

const RUST_GAME_ID = 263490
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, BATTLE_METRICS_TOKEN } = process.env

const BATTLE_METRICS_ENDPOINT = "https://api.battlemetrics.com/servers/9697587" +
  "?include=player&fields%5Bserver%5D=&relations%5Bserver%5D=&fields%5Bplayer%5D=name&relations%5Bplayer%5D="

const twitchClient = new ApiClient({
  authProvider: new ClientCredentialsAuthProvider(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET)
})

function getMemberProperty(member, propertyName) {
  return typeof member === "string" ? member : member[propertyName]
}

async function getOnlinePlayers() {
  const data = await fetch(
    BATTLE_METRICS_ENDPOINT,
    { headers: { Authorization: `Bearer ${BATTLE_METRICS_TOKEN}` } }
  ).then(response => response.json())

  return new Set(data.included.map(player => player.attributes.name))
}

async function getActiveStreamsAndTotalViewers(channelNames) {
  let i = 0
  const rustStreams = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const part = channelNames.slice(i, i + 100)
    if (part.length === 0) break

    // eslint-disable-next-line no-await-in-loop
    const iterator = await twitchClient.helix.streams.getStreamsPaginated({
      userName: part,
      game: RUST_GAME_ID.toString()
    })

    // eslint-disable-next-line no-await-in-loop
    for await (const stream of iterator) {
      rustStreams.push(stream)
    }

    i += 100
  }

  return {
    streams: new Set(channelNames.filter(name => rustStreams.some(stream => stream.userDisplayName === name))),
    totalViewers: rustStreams.reduce((total, stream) => total + stream.viewers, 0)
  }
}

async function run() {
  let skipOnline, onlinePlayers, playingStreams

  try {
    onlinePlayers = await getOnlinePlayers()
    skipOnline = onlinePlayers.size === 0
  } catch {
    skipOnline = true
  }

  if (skipOnline) {
    // BattleMetrics sent a false response

    playingStreams = rawTeams
      .flatMap(team => team.members)
      .map(member => getMemberProperty(member, "twitch"))
  } else {
    playingStreams = rawTeams
      .flatMap(team => team.members)
      .filter(member => onlinePlayers.has(getMemberProperty(member, "game")))
      .map(member => getMemberProperty(member, "twitch"))
  }

  if (playingStreams.length === 0) return {
    teams: rawTeams.map(team => ({ name: team.name, online: [], offline: team.members })),
    totalViewers: 0
  }

  const { streams, totalViewers } = await getActiveStreamsAndTotalViewers(playingStreams)

  const teams = []
  for (const team of rawTeams) {
    const onlineMembers = team.members.filter(member => streams.has(getMemberProperty(member, "twitch")))

    teams.push({
      name: team.name,
      online: onlineMembers,
      offline: team.members.filter(member => !onlineMembers.includes(member))
    })
  }

  return {
    teams,
    totalViewers
  }
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
