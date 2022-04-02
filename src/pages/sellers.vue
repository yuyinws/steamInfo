<template>
  <div>
    {{ sellers }}
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { request } from '@/composables'

interface Seller {
  name: string
  appId: string
}

const sellers: Ref<Seller[]> = ref([])
onMounted(async() => {
  const { data } = await request({
    url: '/api/sellers',
  })
  sellers.value = data
})
</script>
