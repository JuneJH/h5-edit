<template>
 <div class="container">
    <h1 @click="setComp('20px')">大号字体</h1>
    <h2 @click="setComp('20px')">中号字体</h2>
 </div>
</template>

<script setup lang="ts">
import { useEdit } from '../../../../model';

const { addComp } = useEdit();

const setComp = (fontSize:string) => {
    addComp({
        name:"j-text",
        fontSize,
        text:"大号字体",
        fontFamily:'"KaiTi","STKaiti"'
    })
}


</script>]

<style scoped>
.container{
    text-align: center;
}
h1{
    font-size:30px;
    font-family: 'Times New Roman', Times, serif;
    margin: 30px 0px;
    cursor: pointer;
}
</style>