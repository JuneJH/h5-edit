<template>
    <div class="edit-wrapper" :style="style">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { pick } from "lodash-es";
import { computed } from "vue";

const props = defineProps({
    props: {
        type: Object
    }
});

const style = computed(() => pick(props.props, ["left", "top", "width", "height"]));



</script>

<style scoped>
.edit-wrapper{
    position: absolute;
}
</style>