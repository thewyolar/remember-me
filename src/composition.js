import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { CELL, DIFFICULT, GAME_SPEED, GAME_STATUS } from "@/constants";

export default function gameProcess(number, status) {
    let difficult = ref(DIFFICULT.DEFAULT);
    let cells = ref([]);

    watch(difficult, (value) => {
        if (value > DIFFICULT.MAX) {
            difficult.value = DIFFICULT.MAX;
        }
    });

    const init = () => {
        cells.value = [];
        for (let i = 0; i < number.value; i++) {
            cells.value.push({
                id: i,
                clicked: false,
                value: CELL.EMPTY
            });
        }
    };

    onBeforeMount(init);

    const canStartGame = computed(() => {
        return status.value !== GAME_STATUS.PREVIEW && status.value !== GAME_STATUS.WIN;
    });

    const selectCell = (id) => {
        const index = cells.value.findIndex((cell) => {
            return cell.id === id;
        });

        if (index > -1 && !cells.value[index].clicked) {
            cells.value[index].clicked = true;
            checkGame();
        }
    }

    const start = () => {
        init();
        prepareGame();
    }

    const prepareGame = () => {
        status.value = GAME_STATUS.PREVIEW;
        for (let i = 0; i < difficult.value; i++) {
            const index = rand(0, number.value - 1);
            if (cells.value[index].value !== CELL.FILLED) {
                cells.value[index].value = CELL.FILLED;
            } else {
                i--;
            }
        }

        setTimeout(() => {
            status.value = GAME_STATUS.STARTED;
        }, GAME_SPEED);
    }

    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const checkGame = () => {
        const errorIndex = cells.value.findIndex(cell => {
            return cell.clicked && cell.value === CELL.EMPTY;
        });

        if (errorIndex > -1) {
            gameOver();
            return;
        }

        const notFoundItemIndex = cells.value.findIndex(cell => {
            return !cell.clicked && cell.value === CELL.FILLED;
        });

        if (notFoundItemIndex === -1) {
            gameWin();
        }
    }

    const gameOver = () => {
        status.value = GAME_STATUS.LOSE;
        difficult.value = DIFFICULT.DEFAULT;
    }

    const gameWin = () => {
        status.value = GAME_STATUS.WIN;
        setTimeout(async () => {
            difficult.value += 1;
            await nextTick();
            start();
        }, GAME_SPEED);
    }

    const isWin = computed(() => {
        return status.value === GAME_STATUS.WIN;
    });

    const isLose = computed(() => {
        return status.value === GAME_STATUS.LOSE;
    });

    return {
        difficult,
        cells,
        canStartGame,
        isWin,
        isLose,
        start,
        selectCell,
        init
    }
}