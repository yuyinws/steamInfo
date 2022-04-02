<template>
  <div flex flex-col gap-3 mb-100px pb-12 pt-12>
    <div
      v-for="(item, index) in games"
      :key="index"
      rounded-md
      w-full
      m-auto
      bg-white
      dark:bg-normalDark
      text-12px
      p-2
      active:bg-gray-200
      @click="goToGamePage(item.href)"
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
        <div i="carbon-trophy-filled" text-16px :class="trophyColor(index)" />
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
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
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
