<template>
<div class="v-modal" tabindex="-1" id="myModal" @click="value=false" v-if="value">
  <div class="v-modal-dialog border rounded"  @click.stop >
    <div class="v-modal-content bg-white rounded-1 ">
      <div class="v-modal-header py-2 px-2">
        <h5 class="modal-title px-3">{{title}}</h5>
        <button type="button" class="btn-close" @click="value=false" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
modelValue:boolean 
title:string

}>()
const emit = defineEmits(['update:modelValue'])
const value = computed<boolean>({
get(){return props.modelValue},
set(v){emit('update:modelValue',v)}
})

</script>
<style scoped lang="scss">
.v-modal{
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 2;
display: grid;
justify-content: center;
align-content: center;
background: rgba(0, 0, 0, 0.311);
backdrop-filter:blur(4px);
}
.v-modal-content {
  width: 100vw;
  height: 100vh;
}

@media (min-width: 599px){
  .v-modal-content {
  width: fit-content;
  height: fit-content;
}
}

.v-modal-header {
  display: flex;
  justify-content: space-between;
}

</style>