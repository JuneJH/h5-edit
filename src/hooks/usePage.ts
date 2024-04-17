import { ref } from "vue";
import { useDomHeight } from './useDomHeight';


const defaultOption = {
    loop: false,
    delay: 5000,
    dataKey:'rows'
}

export function usePage(requestHander, initCondtion, options={}) {
    options = {...defaultOption,...options}
    const data = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const page = ref(1);
    const size = ref(10)
    const condition = ref(initCondtion);
    const selectRow = ref([]);
    const { containerRef, containerHeight } = useDomHeight();
    let timer = null;


    function startLoop(){
        timer = setInterval(()=>{
            getData();
        },options.delay)
    }

    function stopLoop(){
        clearInterval(timer);
    }

    



    function getData() {
        loading.value = true;
        requestHander({ ...(condition.value), pageNum: page.value, pageSize: size.value }).then(res => {
            if (res.code == "200") {
                data.value = res[options.dataKey];
                total.value = res.total;
            } else {
                throw new Error("获取数据失败")
            }
            loading.value = false;
        })
    }

    function setCondition(cond) {
        if (!cond) {
            condition.value = {};
            getData();
        } else {
            condition.value = { ...(condition.value), ...cond };
            getData();
        }

    }
    function reflashHander(f) {
        if (f == "reset") {
            condition.value = initCondtion;
            page.value = 1;
            size.value = 10;
            getData();
        } else if (f == "force") {
            getData();
        } else {
            getData();
        }
    }
    function setSelectRow(selection) {
        selectRow.value = selection;
    }

    reflashHander("");

    return {
        reflashHander,
        data,
        loading,
        total,
        page,
        size,
        selectRow,
        condition,
        setCondition,
        setSelectRow,
        tableRef: containerRef,
        tableH: containerHeight,
        startLoop,
        stopLoop,
    }
}