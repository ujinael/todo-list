import { ref } from "vue"

export const useToggle = ()=>{
    const isVisible = ref(false)
    const toggle = ()=>{
        isVisible.value = !isVisible.value
    }
    return {isVisible,toggle}
}