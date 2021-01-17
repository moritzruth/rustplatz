<template>
  <div class="server-status">
    <h1>Server ist:</h1><br>
    <h1 v-if="serverIsOnline" class="online">Online</h1>
    <h1 v-else class="offline">Offline</h1>
  </div>
</template>

<style scoped>
.online{
  color:green;
}
.offline{
  color:red;
}
.server-status {
  justify-content: center;
  align-items: center;
}
</style>

<script>
  export default {
    name: "ServerStatus",
    props: {
      serverIsOnline: {
        type: Boolean,
        required: true
      }
    },
    data: () => ({
      isOnline: { value: 0 }
    })
  }
</script>
