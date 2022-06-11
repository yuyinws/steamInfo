<template>
  <div v-if="games.length" flex="~ row gap-3 wrap" mb-100px pb-12 pt-12 justify-center>
    <div
      v-for="(item, index) in games" :key="index" rounded-md w-92 bg-white dark:bg-normalDark text-12px p-2
      active:bg-gray-200 class="active:dark:bg-gray-600" @click="goToGamePage(item.href)"
    >
      <div flex justify-between>
        <div flex>
          <div text-gray-400>
            #{{ index + 1 }}
          </div>
          <div ml-1>
            {{ item.name }}
          </div>
        </div>
        <div v-if="index < 3" i="carbon-trophy-filled" text-16px :class="trophyColor(index)" />
      </div>
      <div flex>
        <div text-gary-900 dark:text-white-700>
          <span>{{ item.current }}</span>
          <span v-if="index === 0" ml-1>(当前在线)</span>
        </div>
        <div ml-5 text-gray-600 dark:text-white-300>
          <span>{{ item.peak }}</span>
          <span v-if="index === 0" ml-1>(今日峰值)</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else flex="~ row gap-3 wrap" pb-12 pt-12 rounded-md justify-center>
    <Skeletor v-for="item in 100" :key="item" width="23rem" height="3rem" rounded-md />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { Skeletor } from 'vue-skeletor'
import { request } from '@/composables'

interface Game {
  name: string
  peak: string
  current: string
  href: string
}

const games: Ref<Game[]> = ref([])
onMounted(async() => {
  const { data } = await request({
    url: '/api/topgames',
  })
  games.value = data
})

const trophyColor = (index: number) => {
  switch (index) {
    case 0:
      return 'text-#F2C056'
    case 1:
      return 'text-#E9E9D8'
    case 2:
      return 'text-#BA6E40'
    default:
      return 'text-gray-300'
  }
}

const goToGamePage = (href: string) => {
  window.open(href)
}
</script>
