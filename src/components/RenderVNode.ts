import { defineComponent, isVNode, h } from "vue";


const RenderVNode = defineComponent({
    props: {
        vNode: {
            type: [Object, String],
            required: true
        }
    },

    render() {
        if (isVNode(this.vNode)) {
            return this.vNode
        } else {
            return h("div", this.vNode as any)
        }
    }
})

export default RenderVNode;