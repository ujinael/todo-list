<template>
<div class="page p-4  ">
    <Teleport :to="'#app'">
  <VModal title="Todo edit" v-model="creating">
<VTodoForm :todo="editedTodo"
 v-if="editedTodo"
 @on-cancel="store.toggleCreating"
 @on-save="onSave"
 />
    </VModal>
    </Teleport>
  
<VTodoList :todos="todos" v-if="todos.length" />
<div class="w-100 d-flex justify-content-center" v-else>
    You have no todo, try to add one
</div>
</div>
</template>
<script setup lang="ts">
import VModal from '@/components/VModal.vue';
import { useToggle } from '@/composables/toggle';
import { Todo } from '@/stores/models';
import { useTodoStore } from '@/stores/modules/todos/todo.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import VTodoForm from './forms/VTodoForm.vue';
import VTodoList from './views/VTodoList.vue';

const store = useTodoStore()
const {todos,editedTodo,creating} = storeToRefs(store)

const onSave = (todo:Todo)=>{
    store.addNewTodo(todo)
    store.toggleCreating()
}
onMounted(()=>{
    store.getAllTodo()
})
</script>
<style scoped lang="scss">
.page{
    height: 100%;
}
</style>