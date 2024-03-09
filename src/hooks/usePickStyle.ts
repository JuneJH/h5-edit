import { pick, without } from "lodash-es";
import { computed } from "vue";
import { textDefaultProps } from "../model/defineEditProps";

export const defaultStyle = without(Object.keys(textDefaultProps), "url", "text", "actionType")
function usePickStyle(props: any, pickStyle = defaultStyle) {
    return computed(() => pick(props, pickStyle))
}

export default usePickStyle;