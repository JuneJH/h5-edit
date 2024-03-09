<template>
    <h1>this is home page;</h1>
    <button @click="setUser">设置编辑</button>
    <router-link to="/edit">前往编辑</router-link>
</template>

<script setup lang="ts">
import { useEdit } from '../model';

const {} = useEdit();

const setUser = () => {
    
}


</script>