<template>
<div class="container-l rounded-1">
    <ul class="todos ">
   <VTodoListItem v-for="todo in todos"
   :key="todo.id"
   :todo="todo"
   />
      
    </ul>
</div>
</template>
<script setup lang="ts">
import { Todo } from '@/stores/models';
import VTodoListItem from '../components/VTodoListItem.vue';
defineProps<{
todos:Todo[]    
}>()
</script>
<style scoped lang="scss">
.todos{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
    gap: 1rem;
}
</style>