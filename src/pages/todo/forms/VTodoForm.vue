<template>
  <form
    @click="validation = false"
    class="form needs-validation"
    @submit="onSave"
    v-if="formObject"
  >
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control rounded"
        id="title"
        v-model="formObject.title"
      />
      <div class="feedback" v-show="validation && !formObject.title.length">
        This must be filled
      </div>
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Planned date</label>
      <input
        type="datetime-local"
        class="form-control"
        id="date"
        v-model="formObject.plannedTo"
      />
      <div class="feedback" v-show="validation && !dateValid">
        this value less than current date
      </div>
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        class="form-control rounded"
        name=""
        id="description"
        rows="4"
        v-model="formObject.description"
      ></textarea>
      <div
        class="feedback"
        v-show="validation && !formObject.description.length"
      >
        This must be filled
      </div>
    </div>

    <button type="submit" class="btn btn-primary d-inline-block">Save</button>
    <button
      type="reset"
      class="btn btn-secondary d-inline-block mx-2"
      @click.stop="emit('onCancel')"
    >
      Cancel
    </button>
  </form>
</template>
<script setup lang="ts">
import { Todo } from "@/stores/models";
import { computed, onMounted, ref } from "vue";
const formObject = ref<
  | (Omit<Todo, "plannedTo" | "id" | "createdAt" | "updatedAt" | "status"> & {
      plannedTo: string;
    })
  | null
>(null);
const props = defineProps<{
  todo: Todo;
}>();
const validation = ref(false);
const dateValid = computed(() => {
  const date = new Date(formObject.value!.plannedTo);
  if (date.getTime() - Date.now() < 0) return false;
  return true;
});
const checkValidation = () => {
  if(!formObject.value) return false
  console.log(dateValid.value);
  
  return !!formObject.value.title &&
    !!formObject.value.description &&
    !!dateValid.value

};
const onSave = (event: Event) => {
  const $form = event.target as HTMLFormElement;
  if ($form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!formObject.value) return;
  const { title, description, plannedTo } = formObject.value;
if(!checkValidation())
 { 
validation.value = true;
return
}


  Object.assign(props.todo, {
    title,
    description,
    plannedTo: new Date(plannedTo),
  });
  emit("onSave",props.todo)
};
onMounted(() => {
  const { title, description, plannedTo } = props.todo;

  formObject.value = {
    title,
    description,
    plannedTo: `${plannedTo.toLocaleString("ru-RU", {
      year: "numeric",
    })}-${plannedTo.toLocaleString("ru-RU", {
      month: "2-digit",
    })}-${plannedTo.toLocaleString("ru-RU", {
      day: "2-digit",
    })} ${plannedTo.toLocaleString("ru-RU", {
      hour: "2-digit",
    })}:${plannedTo.toLocaleString("ru-RU", { minute: "2-digit" })}`,
  };
});
const emit = defineEmits<{
  (event: "onSave", todo: Todo): void;
  (event: "onCancel"): void;
}>();
</script>
<style scoped lang="scss">
.form {
  width: 100%;
  height: 100%;
}
.form__label {
  display: block;
}
.form__input {
  width: 100%;
  border: 1px solid gray;
  padding: 0.2em;
}
@media screen and (min-width: 599px) {
  .form {
    width: 400px;
    height: min-content;
  }
}
.feedback {
  color: red;
  font-size: small;
}
</style>
