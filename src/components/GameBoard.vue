<template>
  <div class="board-wrapper">
    <div class="board">
      <BoardItem v-for="cell in cells" :cell="cell" :status="status" :key="'item-' + cell.id" @selectCell="selectCell" />
      <p class="win" v-if="isWin">Правильно, следующий уровень!</p>
      <p class="lose" v-if="isLose">Вы проиграли!</p>
      <p class="difficult">Сложность: <strong>{{ difficult }}</strong></p>
      <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>
    </div>
  </div>
</template>

<script>
import BoardItem from "@/components/BoardItem.vue";
import { ref } from "vue";
import { CELLS_NUMBER, GAME_STATUS } from "@/constants";
import gameProcess from "@/composition";

export default {
  name: "GameBoard",
  props: {},
  components: {
    BoardItem
  },
  setup() {
    const number = ref(CELLS_NUMBER);
    let status = ref(GAME_STATUS.NONE);

    const { difficult, cells, canStartGame, isWin, isLose, start, selectCell, init } = gameProcess(number, status);

    return {
      difficult, cells, number, status, canStartGame, isWin, isLose, start, selectCell, init
    }
  }
}
</script>

<style scoped>
.board-wrapper {
  margin-bottom: 100px;
}

.board {
  width: 300px;
  background: #eee;
  margin: 0 auto;
}

.btn {
  background: #42b983cc;
  color: white;
  border: none;
  border-radius: 2px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  outline: none;
}

.btn:hover {
  background: #42b983;
}

.btn:disabled {
  opacity: .5;
}

.win {
  color: #42b983;
}

.lose {
  color: #ff000055;
}
</style>