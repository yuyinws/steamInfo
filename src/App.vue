<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'SteamInfo',
  meta: [
    { name: 'description', content: 'A Simple Steam Info Website' },
  ],
})
</script>

<template>
  <router-view />
</template>
