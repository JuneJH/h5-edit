<template>
    <div class="edit-wrapper" ref="editRef" :style="style">
        <slot class="edit-item1"></slot>
        <div class="resize-container" @mousedown.stop="startResize">
            <div class="resize-item top-left"></div>
            <div class="resize-item top-right"></div>
            <div class="resize-item bottom-left"></div>
            <div class="resize-item bottom-right"></div>
        </div>
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


function startResize(e) {
    let isMove = false;
    const { top: containerTop, left: containerLeft } = document.getElementById("edit-container").getBoundingClientRect();
    const { top, left } = editRef.value.getBoundingClientRect() as DOMRect;
    const gapX = e.clientX - left;
    const gapY = e.clientY - top;

    function handlerMove(e) {
        isMove = true;
        const h = e.clientY  - top + "px";
        const w = e.clientX  - left + "px";
        editRef.value.style.height = h
        editRef.value.style.width = w
    }

    function handleUp(e) {
        document.removeEventListener("mousemove", handlerMove);
        const h = e.clientY  - top + "px";
        const w = e.clientX  - left + "px";
        if (isMove) {
            state.setProps(props.props.id, "width", w + "px");
            state.setProps(props.props.id, "height", h + "px");
            isMove = false;
        }
        document.removeEventListener("mouseup", handleUp);
    }
    document.addEventListener("mousemove", handlerMove);
    document.addEventListener("mouseup", handleUp)
}

const style = computed(() => pick(props.props, ["left", "top", "width", "height"]));



</script>

<style scoped>
.edit-wrapper {
    position: absolute;
    z-index: 2;
}

.resize-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: -1;
}

.resize-item {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    z-index: 99;
}

.top-left {
    left: -3px;
    top: -3px;
    cursor: nwse-resize;
}

.top-right {
    right: -6px;
    top: -6px;
    cursor: nesw-resize;
}

.bottom-left {
    left: -6px;
    bottom: -6px;
    cursor: nesw-resize;
}

.bottom-right {
    right: -6px;
    bottom: -6px;
    cursor: nwse-resize;
}
</style>