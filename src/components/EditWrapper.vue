<template>
    <div class="edit-wrapper" ref="editRef" :style="style" >
        <slot class="edit-item"></slot>
    </div>
</template>
<script setup lang="ts">
import { pick } from "lodash-es";
import { computed,onMounted,ref } from "vue";
import func from "../../vue-temp/vue-editor-bridge";

const props = defineProps({
    props: {
        type: Object
    }
});

const editRef = ref();

window.ref = editRef;
onMounted(() => {
    editRef.value.addEventListener("mousedown", (e: any) => {
        const { top: containerTop, left: containerLeft } = document.getElementById("edit-container").getBoundingClientRect();
        const { top, left } = editRef.value.getBoundingClientRect() as DOMRect;
        const gapX = e.clientX - left;
        const gapY = e.clientY - top;
        function handlerMove(e) {
            console.log(e.clientX, e.clientY)
            const left = e.clientX - gapX - containerLeft;
            const top = e.clientY - gapY - containerTop;
            console.log("移动", left, top)

            editRef.value.style.top = top+"px";
            editRef.value.style.left = left + "px";
        }

        function handleUp(e){
            document.removeEventListener("mousemove",handlerMove);
        }

        document.addEventListener("mousemove", handlerMove);
        document.addEventListener("mouseup",handleUp)
    })
})


const style = computed(() => pick(props.props, ["left", "top","width","height"]));



</script>

<style scoped>
.edit-wrapper{
    position: absolute;
}
.edit-item{
    position: static;
}
</style>