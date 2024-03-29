import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { data } from './mockData';
import { EditPageProps, H5PageProps, CompProps } from './defineEditProps';
import { v4 as uuid } from 'uuid';



const useEdit = defineStore("edit", () => {
    const state = ref<EditPageProps>({
        pages: data,
        components: [],
    })

    function addComp(comp: CompProps) {
        state.value.components?.push({
            id: uuid(),
            ...comp,
        });
    }
    function setCurrentCompId(id: string) {
        const target = state.value.components?.find(item => item.id === id);
        if (target) {
            state.value.currentElement = target.id;
        }
    }
    function deleteComp(id: string) {
        const res = state.value.components?.filter(item => item.id !== id);
        state.value.components = res;
        return 1;
    }

    const currentElement = computed(() => {
        const target = state.value.components?.find(item => item.id === state.value.currentElement);
        return target;
    });

    function setProps(key:any,val:any){
        const target:any = state.value.components?.find(item => item.id === state.value.currentElement);
        if(target){
            target[key] = val;
        }

    }



    return {
        state,
        setCurrentCompId,
        addComp,
        deleteComp,
        currentElement,
        setProps
    };

})


export default useEdit;