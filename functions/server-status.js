function getStatus() {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  let isOnline = false
  if (currentHour >= 15 || currentHour >= 3) {
    isOnline = true
  }
  return isOnline
}
exports.handler = async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(await getStatus()),
    headers: {
      "Cache-Control": "public, max-age=60"
    }
  }
}
