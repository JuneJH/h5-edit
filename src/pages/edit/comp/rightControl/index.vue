<template>
    <h1>右侧操作栏</h1>
    <Form :componet-config="(state.currentElement as any)" @on-change="onChange"></Form>
</template>

<script lang="ts" setup>
import { useEdit } from '../../../../model';
import Form from '../../../../components/form/index.vue';

const state = useEdit();
console.log("stat",state)


function onChange(val: any) {
    state.setProps(val.key, val.value)
}







</script>