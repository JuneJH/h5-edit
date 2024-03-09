import { VNode,h } from "vue";

const fontFamilyArr = [
    { label: '宋体', value: '"SimSun","STSong"' },
    { label: '黑体', value: '"SimHei","STHeiti"' },
    { label: '楷体', value: '"KaiTi","STKaiti"' },
    { label: '仿宋', value: '"FangSong","STFangsong"' },
    { label: 'Arial', value: '"Arial", sans-serif' },
    { label: 'Arial Black', value: '"Arial Black", sans-serif' },
    { label: 'Comic Sans MS', value: '"Comic Sans MS"' },
    { label: 'Courier New', value: '"Courier New", monospace' },
    { label: 'Georgia', value: '"Georgia", serif' },
    { label: 'Times New Roman', value: '"Times New Roman", serif' }
];
const tranformFontFamily = fontFamilyArr.map(font=>{
    return {
        value:font.value,
        label:h('span',{style:{fontFamily:font.value}},font.label)
    }
})
interface FormProps {
    component: string
    eventName: string
    beforeTransform: (v: any) => any
    afterTransform: (v: any) => any
    label?: string
    valueProp: string
    subComponent?: string
    options?: { label: string | VNode, value: any }[]
    extraProps?: { [key: string]: any }
    parent?: string
    extraEvent?: string
}

interface FormTypes {
    [key: string]: FormProps
}

const defaultMap: FormProps = {
    component: "j-input",
    eventName: "change",
    valueProp: "value",
    beforeTransform: (v) => v,
    afterTransform: v => v
}
const numberToPxHandr = {
    ...defaultMap,
    component: "j-input-number",
    beforeTransform: (v: string) => v ? parseInt(v) : 0,
    afterTransform: (e: number) => e ? `${e}px` : '0px',
}
// 动态表单映射表
const formTypesMaps: FormTypes = {
    text: {
        ...defaultMap,
        component: "j-input",
        afterTransform: (e: any) => e.target.value,
        label: "文本"
    },
    fontSize: {
        ...numberToPxHandr,
        label:"字号"
    },
    href:{
        ...defaultMap,
        afterTransform:(e:any)=>e.target.value
    },
    fontFamily:{
        ...defaultMap,
        component:'j-select',
        subComponent:'j-select-option',
        label:"字体",
        options:[
            {value:"",label:'无'},
            ...tranformFontFamily
        ]
    }
}

export default formTypesMaps;