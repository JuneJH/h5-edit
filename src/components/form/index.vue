<template>
    <div class="container">
        <div v-for="item in compConfig">
            <component
                v-if="!item.options"
                :is="item.component"
                v-bind="item.extraProps"
                :[item.valueProp]="item.value"
                v-on="item.events"
            ></component>
            <component
                v-else
                :is="item.component"
                v-bind="item.extraProps"
                :[item.valueProps]="item.value"
                v-on="item.events"
            >
            <component
                :is="item.subComponent"
                v-for="(option,k) in item.options"
                :key="k"
                :value="option.value"
            >
            <RenderVNode :v-node="option.label"></RenderVNode>
            </component>
            </component>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { map } from 'lodash-es';
import { computed } from 'vue';
import formMap from './formMap';
import RenderVNode from '../RenderVNode';

const props = defineProps({
    componetConfig: {
        type: Object,
        required: true
    },
    onChange:{
        type:Function
    }
});
const emit = defineEmits(["onChange"])

const compConfig :any= computed(() => {
    return map(props.componetConfig, ( value, key) => {
        if(!Object.keys(formMap).includes(key)){
            return {};
        }
        const {
            component,
            beforeTransform,
            afterTransform,
            eventName,
            label,
            valueProp,
            options,
            subComponent,
            extraProps = {},
            parent,
            extraEvent
        } = formMap[key];

        return {
            key,
            component,
            label,
            valueProp,
            value:beforeTransform( value),
            extraProps,
            events:{
                [eventName]:(e:any)=>{
                    emit("onChange",{key,value:afterTransform(e)})
                },
                ...(extraEvent && ({[extraEvent]:(data:any)=>{
                    emit("onChange",{data,key})
                }}))
            },
            options,
            subComponent
        }

    }).filter((itme)=>Object.keys(itme).length > 0)
})


</script>
