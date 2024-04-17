import { VNode } from "vue"

export interface IDynamicFormProps {
    component: string
    eventName: string
    name:string
    beforeTransform?: (v: any) => any
    afterTransform?: (v: any,res:any) => any
    optionsTransform?: (v: any) => any
    label?: string
    valueProp: string
    subComponent?: string
    options?: { label: string | VNode, value: any }[] | string | any
    extraProps?: { [key: string]: any }
    parent?: string
    extraEvent?: string
    rules?:any
}
