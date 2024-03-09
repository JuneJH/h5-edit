<template>
    <div :style="styleProps" class="j-text-container">
        {{ props.text }}
    </div>
</template>

<script lang="ts" setup>
import { usePickStyle } from '../hooks';
import { definePropsHelper,textDefaultProps } from '../model/defineEditProps';

const props = defineProps({
    ...definePropsHelper((textDefaultProps as any))
});

const styleProps = usePickStyle(props);



</script>

<style scoped>
.j-text-container{
    position: relative !important;
}
</style>