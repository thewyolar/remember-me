<template>
  <div class="board-wrapper">
    <div class="board">
      <BoardItem v-for="cell in cells" :cell="cell" :preview="preview" :key="'item-' + cell.id" @selectCell="selectCell($event)" />
      <p class="difficult">Сложность: <strong>{{ difficult }}</strong></p>
      <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>
    </div>
  </div>
</template>

<script>
import BoardItem from "@/components/BoardItem.vue";
import { computed, onBeforeMount, ref } from "vue";

export default {
  name: "GameBoard",
  props: {},
  components: {
    BoardItem
  },
  setup() {
    let difficult = ref(3);
    let cells = ref([]);
    const number = 25;
    let preview = ref(false);

    const init = () => {
      cells.value = [];
      for (let i = 0; i < number; i++) {
        cells.value.push({
          id: i,
          clicked: false,
          value: 0
        });
      }
    };

    onBeforeMount(init);

    const canStartGame = computed(() => {
      return preview.value !== true;
    });

    const selectCell = (id) => {
      const index = cells.value.findIndex((cell) => {
        return cell.id === id;
      });

      if (index > -1) {
        cells.value[index].clicked = true;
      }
    }

    return {
      difficult,
      cells,
      number,
      preview,
      canStartGame,
      selectCell,
      init
    }
  },

  methods: {
    start() {
      this.init();
      this.prepareGame();
    },

    prepareGame() {
      this.preview = true;
      for (let i = 0; i < this.difficult; i++) {
        const index = this.rand(0, this.number - 1);
        if (this.cells[index].value !== 1) {
          this.cells[index].value = 1;
        }
        else {
          i--;
        }
      }

      setTimeout(() => {
        this.preview = false;
      }, 2000);
    },

    rand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
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
</style>