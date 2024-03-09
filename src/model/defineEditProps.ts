import { mapValues } from 'lodash-es';
// 定义元素属性
export interface CompProps {
    id?: string
    name?: string
    text: string
    // css
    fontSize?: string
    fontFamily?: string
    fontStyle?: string
    textDecoration?: string
    fontWeight?: string
    color?: string
    lineHeight?: string
    textAlign?: "left" | "center" | "right"
    backgroundColor?: string
    height?: number | string
    width?: number | string
    marginLeft?: number
    marginRight?: number
    marginTop?: number
    marginBottom?: number
    borderStyle?: string
    borderColor?: string
    borderWidth?: number | string
    borderRedius?: number

    x?: number
    y?: number
}

// 定义h5页面属性
export interface H5PageProps {
    components?: CompProps[]
    setting?: { [key: string]: any }
    id?: string
    title?: string
    desc?: string
    coverImg?: string
    uuid?: string
    user?: {
        username?: string
        nickName?: string
        headerImg?: string
    }
}

// 定义编辑页面
export interface EditPageProps {
    components?: CompProps[]
    currentElement?: string
    currentEditing?: CompProps
    isDirty?: boolean
    isChangedNotPublished?: boolean
    copiedComponent?: CompProps
    pages?: H5PageProps[]
}
// 定义通用属性
export const commonDefaultProps = {
    // actions
    actionType: '',
    url: '',
    // size
    height: '',
    width: '318px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border type
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    // shadow and opacity
    boxShadow: '0 0 0 #000000',
    opacity: 1,
    // position and x,y
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0'
}
// 定义文本
export const textDefaultProps: CompProps = {
    // basic props - font styles
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...commonDefaultProps
}



export function definePropsHelper(props: { [key: string]: any }) {
    return mapValues(props, (item) => {
        return {
            type: item.constructor,
            default: item
        }
    })

}