

<template>
<component :is="layout"></component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const layout = computed(()=>{
return route.meta.layout ?? "default-layout"
})
</script>
<style lang="scss">
@import "@/assets/main.scss";
</style>
