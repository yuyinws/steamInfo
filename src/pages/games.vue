<script setup lang="ts">
import axios from 'axios'

Promise.allSettled([axios.get('/api/topgames'), axios.get('/api/sellers')]).then((res) => {
  console.log(res)
})
</script>
<template>
  fff
</template>
