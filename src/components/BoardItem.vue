<template>
  <span :class="getBoardItemClasses" @click="select(cell.id)"></span>
</template>

<script>
import { computed } from "vue";
import { CELL, GAME_STATUS } from "@/constants";

export default {
  name: "BoardItem",
  props: {
    cell: {
      type: Object,
      required: true
    },
    status: {
      type: Number,
      required: false,
      default: GAME_STATUS.NONE
    }
  },
  setup(props) {
    const getBoardItemClasses = computed(() => {
      let classes = "item";
      if (props.cell.value === CELL.FILLED && props.status === GAME_STATUS.PREVIEW || props.cell.clicked && props.cell.value === CELL.FILLED) {
        classes += " active";
      } else if (props.cell.clicked && props.cell.value === CELL.EMPTY) {
        classes += " error";
      }

      return classes;
    });

    return {
      getBoardItemClasses
    };
  },
  methods: {
    select(id) {
      if (this.status === GAME_STATUS.STARTED) {
        this.$emit('selectCell', id);
      }
    }
  }
}
</script>

<style scoped>
.item {
  position: relative;
  width: 50px;
  height: 50px;
  background: #ccc;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  transition: .4s;
  transform-style: preserve-3d;
}

.item.active {
  background: #42b983cc;
  transform: rotateX(180deg);
}

.item.error {
  background: #ff000055;
  transform: rotateX(180deg);
}
</style>