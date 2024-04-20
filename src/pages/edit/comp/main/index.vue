<template>
    <div class="container" id="edit-container">
        <EditWrapper ref="editRef" v-for="comp in components" @click="editHander(comp)" :props="comp"
            :class="{ 'active': state.currentElement?.id === comp.id }">
            <component class="edit-item" :is="comp.name" v-bind="comp"></component>
        </EditWrapper>
    </div>
</template>

<script setup lang="ts">
import { computed} from 'vue'
import { useEdit } from '../../../../model/index';
import { CompProps } from '../../../../model/defineEditProps';
import EditWrapper from '../../../../components/EditWrapper.vue';
const state = useEdit();
const { setCurrentCompId } = state;
const components = computed(() => {
    return state.state.components;
})

function editHander(item: CompProps) {
    if (item && item.id) {
        setCurrentCompId(item.id)
    }
}
function del(obj: any) {
    const { left, right, ...reset } = obj;
    return reset;
}


</script>


<style scoped>
.container {
    width: 400px;
    height: 600px;
    background-color: #fff;
    position: fixed
}

.active {
    border: 1px solid orange;
}

.edit-item {
    position: static !important;
    height: 100% !important;
    width: 100% !important;
}
</style>