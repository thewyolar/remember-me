<template>
  <span :class="getBoardItemClasses" @click="select(cell.id)"></span>
</template>

<script>
import { computed } from "vue";

export default {
  name: "BoardItem",
  props: {
    cell: {
      type: Object,
      required: true
    },
    preview: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const getBoardItemClasses = computed(() => {
      let classes = 'item ';
      if (props.cell.value === 1 && props.preview || props.cell.clicked) {
        classes += 'active';
      }

      return classes;
    });

    return {
      getBoardItemClasses
    };
  },
  methods: {
    select(id) {
      //if (this.preview === true) {
        this.$emit('selectCell', id);
      //}
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
</style>