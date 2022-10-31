<template>
<div class="layout">
    <VLayoutHeader/>
    <main class="main">
<router-view></router-view>
    </main>
</div>
</template>
<script setup lang="ts">
import VLayoutHeader from './components/VLayoutHeader.vue';


</script>
<style scoped lang="scss">
.layout{
    min-height: 100vh;
    display: grid;
    grid-template-rows: min-content 1fr;
}
</style>