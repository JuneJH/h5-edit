<template>
    <div class="edit-wrapper" ref="editRef" :class="{ 'active': state.currentElement?.id === props.props.id }"
        :style="style">
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

function calcResize(dir: string, e: any) {
    const { top, left, width, height} = editRef.value.getBoundingClientRect() as DOMRect;
    const offsetLeft = editRef.value.offsetLeft
    switch (dir) {
        case "top-left":

            break;
        case "bottom-right": {
            const h = e.clientY - top + "px";
            const w = e.clientX - left + "px";
            return {
                height:h, width:w
            }
        }
        case "bottom-left": {
            const moveLeft = e.clientX - left;
            const w = Math.floor(width + (-moveLeft))
            return {
                height: e.clientY - top + "px",
                left: offsetLeft + moveLeft + "px",
                width: w + "px"
            }
        }

        default:
            break;
    }

}

function startResize(e) {
    let isMove = false;
    const dir = e.target.classList[1];
    function handlerMove(e) {
        isMove = true;
        const {height,width,left} = calcResize(dir,e)
        if(left){
            editRef.value.style.left = left;
        }
        editRef.value.style.height = height
        editRef.value.style.width = width
    }

    function handleUp(e) {
        document.removeEventListener("mousemove", handlerMove);
        const res = calcResize(dir,e);
        if (isMove) {
            Object.keys(res).forEach(key=>{
                state.setProps(props.props.id, key, res[key]);
            })
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
    cursor: pointer;
}

.active .resize-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: -1;
}

.active .resize-item {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: red;
    z-index: 99;
}

.active .top-left {
    left: -6px;
    top: -6px;
    cursor: nwse-resize;
}

.active .top-right {
    right: -6px;
    top: -6px;
    cursor: nesw-resize;
}

.active .bottom-left {
    left: -6px;
    bottom: -6px;
    cursor: nesw-resize;
}

.active .bottom-right {
    right: -6px;
    bottom: -6px;
    cursor: nwse-resize;
}
</style>