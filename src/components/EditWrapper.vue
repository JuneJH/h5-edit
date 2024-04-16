<template>
    <div class="edit-wrapper" ref="editRef" :style="style">
        <slot class="edit-item"></slot>
    </div>
</template>
<script setup lang="ts">
import { pick } from "lodash-es";
import { computed, onMounted, ref } from "vue";
import useEdit from "../model/edit";
const state = useEdit();

const props = defineProps({
    props: {
        type: Object
    }
});

const editRef = ref();
onMounted(() => {
    let isMove = false;
    editRef.value.addEventListener("mousedown", (e: any) => {

        const { top: containerTop, left: containerLeft } = document.getElementById("edit-container").getBoundingClientRect();
        const { top, left } = editRef.value.getBoundingClientRect() as DOMRect;
        const gapX = e.clientX - left;
        const gapY = e.clientY - top;

        function handlerMove(e) {
            isMove = true;
            const left = e.clientX - gapX - containerLeft;
            const top = e.clientY - gapY - containerTop;
            editRef.value.style.top = top + "px";
            editRef.value.style.left = left + "px";
        }

        function handleUp(e) {
            document.removeEventListener("mousemove", handlerMove);
            const left = e.clientX - gapX - containerLeft;
            const top = e.clientY - gapY - containerTop;
            console.log("鼠标抬起")
            if (isMove) {
                state.setProps(props.props.id, "left", left + "px");
                state.setProps(props.props.id, "top", top + "px");
                isMove = false;
            }
            document.removeEventListener("mouseup", handleUp);
        }
        document.addEventListener("mousemove", handlerMove);
        document.addEventListener("mouseup", handleUp)
    })
})


const style = computed(() => pick(props.props, ["left", "top", "width", "height"]));



</script>

<style scoped>
.edit-wrapper {
    position: absolute;
}

.edit-item {
    position: static;
}
</style>