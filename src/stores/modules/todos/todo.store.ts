import { Api } from "@/stores/store.api";
import { defineStore } from "pinia";
import { TodoStatus } from "./entity/status.entity";
import { Todo } from "./entity/todo.entity";
interface TodosState {
  todos: Todo[];
  editedTodo:Todo|null,
  creating:boolean
}
export const useTodoStore = defineStore("todos", {
  state():TodosState {
    return {
      todos: [],
      editedTodo:null,
      creating:false
    };
  },
  getters: {},
  actions: {
   async getAllTodo() {
try {
   const todos = await Api.shared()
    .child("todos").get<Todo[]>([],Todo)
   this.todos = todos
} catch (error) {
  throw new Error("Network error")
}
   
    },
    setEditedTodo(todo:Todo){
this.editedTodo = todo
    },
    createNewTodo() {
      return new Todo(
        "Новая задача",
        "",
        new Date(),
        TodoStatus.PLANNED
        
      );
    },

    async addNewTodo(todo: Todo) {
      try {
          const newTodo = await Api.shared()
      .child("todos").post<Todo,Todo>(todo,Todo)
      this.todos.push(newTodo);
      } catch (error) {
        throw new Error("Network error")

      }
    
      
    },
    toggleCreating(){
      this.creating = !this.creating
    },
    async removeTodo(id: number) {
try {
     await Api.shared().child("todos",id+'').delete()
        this.todos = this.todos.filter(todo=>todo.id !== id)
} catch (error) {
  throw new Error("Network error")

}
   
    
      },
   async setTodoStatus(todo: Todo, status: TodoStatus) {
try {
  todo.status = status

 await Api.shared()
.child("todos",todo.id + '').update<Todo,Todo>(todo,Todo)
} catch (error) {
throw new Error("Network error")

}

    },
  },
});
