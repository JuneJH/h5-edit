<template>
    <el-form ref="formRef" :model="model" :inline="props.inline" :rules="rules" label-width="auto"
        :labelPosition="props.labelPosition || 'top'">
        <el-form-item v-for="item in enConf" :label="item.label" :prop="item.name">
            <component class="w100" v-if="!item.options" :is="item.component" v-bind="item.extraProps"
                v-model="model[item.name]" :placeholder="`请输入${item.label}`" @keyup.enter="onEnter">
            </component>
            <component class="w100" v-else :is="item.component" v-bind="item.extraProps" v-model="model[item.name]"
                :placeholder="`请输入${item.label}`" @keyup.enter="onEnter">
                <component style="width:100%" :is="item.subComponent" v-for="(option, k) in options[item.name]"
                    :label="option.label" :key="k" :value="option.value">
                    {{ option.label }}
                </component>
            </component>

        </el-form-item>
        <slot></slot>
    </el-form>

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDict } from "../model/dict";
import { IDynamicFormProps } from './IDynamicForm';
const dict = useDict();

const props = defineProps(["conf", "initVal", "ref", "inline", "labelPosition"]);
interface IEmits {
    (event: "onChange", ...args: any[]): void
    (event: "onEnter", ...args: any[]): void
};
const emits = defineEmits<IEmits>();
const model = ref(props.initVal);
const formRef = ref();

watch(() => props.initVal, () => {
    model.value = Object.assign(model.value, props.initVal);
})
const options = ref<any>({});

const enConf = computed(() => {
    return props.conf.map((item:IDynamicFormProps) => {
        if (typeof item.options === "function") {
            const apiHander = item.options;
            const hander = item.optionsTransform;
            apiHander().then((res:any) => {
                if (res.code == 200) {
                    if (typeof hander === "function") {
                        options.value[item.name] = hander(res.rows);
                    } else {
                        options.value[item.name] = res.rows;
                    }
                } else {
                    // 失败
                }
            })
        } else if (Array.isArray(item.options)) {
            options.value[item.name] = item.options
        } else if (typeof item.options === "string") {
            const d = dict.getDictByKey(item.options);
            if (d) {
                const hander = item.optionsTransform || (d => d.map(({ dictLabel, dictValue }:any) => ({ label: dictLabel, value: dictValue })));
                options.value[item.name] = hander(d)
            }
        }
        return {
            ...item,
        }
    })
})


function onEnter() {
    emits("onEnter", model.value);
}
const rules = computed(() => {
    const rules:any = {};
    const conf = props.conf;
    conf.forEach((item: any) => {
        if (conf.required) {
            rules[item.name] = [
                {
                    required: true, message: `请输入${item.label}`, trigger: 'blur'
                }
            ]
        } else if (conf.rules) {
            rules[item.name] = conf.rules;
        }

    })
    return rules;
})
function onChange() {
    emits("onChange", model.value);
}

function validate() {
    return formRef.value.validate()
}

function resetFields() {
    return formRef.value.resetFields();
}

function getData() {
    const res = { ...model.value };
    props.conf.map((item:any) => {
        if (typeof item.afterTransform === "function") {
            const name = item.name;
            item.afterTransform(res[name], res);
        }
    })
    return res;
}

defineExpose({
    validate,
    resetFields,
    getData
})

</script>