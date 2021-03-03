const { ClientCredentialsAuthProvider } = require("twitch-auth")
const { ApiClient } = require("twitch")
const rawData = require("../data.json")

const RUST_GAME_ID = 263490
const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env

const twitchClient = new ApiClient({
  authProvider: new ClientCredentialsAuthProvider(TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET)
})

function getMemberProperty(member, propertyName) {
  return typeof member === "string" ? member : member[propertyName]
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
  const { streams, totalViewers } = await getActiveStreamsAndTotalViewers(rawData.teams
    .flatMap(team => team.members)
    .map(member => getMemberProperty(member, "twitch")))

  const teams = []
  for (const team of rawData.teams) {
    const currentlyStreamingMembers = team.members.filter(member => streams.has(getMemberProperty(member, "twitch")))

    teams.push({
      id: team.id,
      name: team.name,
      live: currentlyStreamingMembers,
      offline: team.members.filter(member => !currentlyStreamingMembers.includes(member)),
      nonStreamers: team.nonStreamerMembers === undefined ? [] : team.nonStreamerMembers
    })
  }

  return {
    ended: rawData.ended,
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
