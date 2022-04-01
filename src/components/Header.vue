<template>
  <div p2 text-xl flex justify-between>
    <div i="carbon-help" />
    <div>Steam Info</div>
    <div i="carbon-sun dark:carbon-moon" @click="toggleDark()" />
  </div>
  <div divider />
</template>

<script setup lang="ts">
import { toggleDark } from '@/composables'

</script>
