<template>
  <div p2 text-xl flex justify-between dark:bg-headerDark fixed w-full bg-white z-100>
    <div i="carbon-help" @click="togglePanelShow()" />
    <div>Steam Info</div>
    <div i="carbon-sun dark:carbon-moon" @click="toggleDark()" />
  </div>
  <div divider />
</template>

<script setup lang="ts">
import { toggleDark, togglePanelShow } from '@/composables'

</script>
