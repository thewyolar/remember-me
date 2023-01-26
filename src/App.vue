<template>
  <div class="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <h1 class="h1">Remember me</h1>
    <p>Запомни и открой зеленые клетки</p>
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";

export default {
  name: 'App',
  components: {
    GameBoard
  }
}
</script>

<style scoped>
.app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  margin-top: 40px;
  color: #2c3e50
}

.logo {
  width: 100px;
}
</style>
