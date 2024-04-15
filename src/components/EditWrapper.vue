<template>
    <div class="edit-wrapper" ref="editRef" :style="style" >
        <slot class="edit-item"></slot>
    </div>
</template>
<script setup lang="ts">
import { pick } from "lodash-es";
import { computed,ref,onMounted } from "vue";

const props = defineProps({
    props: {
        type: Object
    }
});

const editRef = ref();


onMounted(()=>{
    editRef.value.addEventListener("mousedown",(e:any)=>{
        console.log("点击了",e)
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