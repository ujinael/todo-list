<template>
  <li class="todo__item">
  

<h4>{{todo.title}}</h4>
 <div :class="plannedDateClass">Planned on:&nbsp;{{dateFormat(todo.plannedTo)}}</div>
 <div class="todo__status" :class="statusClasses">Status:&nbsp;{{todo.status}}</div>
          
  <span class="todo__description" :title="todo.description">
    {{todo.description}}
  </span>
  <div class="todo__actions mt-4 d-flex justify-content-left gap-2">
<button class="btn btn-primary" @click="onExecute">{{statusBtnTitle}}</button>
    <button class="btn btn-danger "
@click="onDelete(todo.id)"
>Delete</button>
  </div>

    </li>
</template>
<script setup lang="ts">
import {useToggle} from "@/composables/toggle"
import { Todo, TodoStatus } from '@/stores/models';
import { useTodoStore } from "@/stores/modules/todos/todo.store";
import { computed } from "vue";



const {isVisible,toggle} = useToggle()
const props = defineProps<{
 todo:Todo   
}
>()
const store = useTodoStore()
const onDelete = (id?:number)=>{
if(!id)return
store.removeTodo(id)
}

const onExecute = ()=>{
  let status = TodoStatus.PLANNED
  if(props.todo.status === TodoStatus.PLANNED)status = TodoStatus.EXECUTED
 else status = TodoStatus.PLANNED
  store.setTodoStatus(props.todo,status)
}
const statusBtnTitle = computed(()=>{
if(props.todo.status === TodoStatus.PLANNED)return "Execute"
else return "Plane"
})
const statusClasses = computed(()=>{
  return {
    planned:props.todo.status === TodoStatus.PLANNED,
    executed:props.todo.status === TodoStatus.EXECUTED

  }
})
const plannedDateClass =computed(()=>{
    return {
        overdue:Date.now() - props.todo.plannedTo.getTime() >0
    }
})
const dateFormat = (date:Date)=>{
    return date.toLocaleString("ru-RU",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})
}
</script>
<style scoped lang="scss">
.todo{
  &__item{
box-shadow: 3px 3px 6px gray;
padding: 1rem;
border-radius: 5px;
  }
  &__description{
  display: inline-block;
  word-wrap: break-word;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
&__status.planned{
color: orange;
}
&__status.executed{
  color: green;
}
}


.btn{
  min-width: 120px;
}
.overdue{
    color: red;
}

</style>