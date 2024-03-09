<template>
    <row class="layout">
        <Col :span="4" class="left">
            <LeftControl></LeftControl>
        </Col>
        <Col :span="16" class="main">
            <Main/>
        </Col>
        <Col :span="4" class="right">
            <RightControl></RightControl>
        </Col>
    </row>
</template>

<script setup lang="ts">
import { Row, Col } from 'ant-design-vue';
import LeftControl from './comp/leftControl/index.vue';
import RightControl from './comp/rightControl/index.vue';
import Main from "./comp/main/index.vue";

</script>

<style>
.layout {
    height: 100vh;
    background-color: #dddddd69;
}

.right {
    background-color: #fff;
}

.left {
    background-color: #fff;
}

.main {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>