import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDict = defineStore('dict', () => {
    const data = ref<any>({})

    function getDictByKey(key:string) {
        return data.value[key] || []
    }

    async function getData() {
        const res = {code:200,data:[]};
        if (res.code == 200) {
            data.value['warning_type'] = res.data;
        }
    }
    return { data, getData,getDictByKey }
})