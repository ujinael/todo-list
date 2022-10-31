<template>
<header class="header">
    <button type="button" 
    class="btn btn-primary d-inline-block"
    @click="onAddButton"
    >Add&nbsp;todo</button>
   <h3>TodoList</h3> 
</header>
</template>
<script setup lang="ts">
import { useToggle } from '@/composables/toggle';
import { useTodoStore } from '@/stores/modules/todos/todo.store';

const onAddButton = ()=>{
    store.setEditedTodo(store.createNewTodo())
    store.toggleCreating()
}
const store = useTodoStore()
const {toggle} = useToggle()
</script>
<style scoped lang="scss">
.header{
    background-color: whitesmoke;
    padding: .5rem;
    box-shadow: 0 2px 2px gray;
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
}

.btn{
    justify-self: left;
}

</style>