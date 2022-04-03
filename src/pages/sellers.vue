<template>
  <div v-if="sellers.length" flex="~ col gap-4" mb-100px pb-12 pt-12 p-2>
    <div v-for="(item, index) in sellers" :key="index">
      <div flex justify-center w-full bg-white p-2 dark:bg-normalDark rounded-t-md text-18px text-gray-400>
        {{ item.name }}
      </div>
      <div flex w-full bg-white rounded-b-md>
        <img
          h-40
          rounded-b-md
          w-full
          object-fill
          :src="getImgUrl(item)"
        >
      </div>
    </div>
    <div text-12px text-center text-gray-300>
      更新于 {{ _pubDate }}
    </div>
  </div>
  <div v-else h-full flex justify-center b-0 fixed top-60 left-0 right-0 text-gray-600 dark:text-white-300>
    暂无数据:(
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { request } from '@/composables'

interface Seller {
  name: string
  appId: string | null
  subId: string | null
  content: boolean
}
const sellers: Ref<Seller[]> = ref([])
const _pubDate: Ref<string> = ref('')

const getImgUrl = (item: Seller) => {
  if (item.content) {
    if (item.subId)
      return `https://cdn.akamai.steamstatic.com/steam/subs/${item.subId}/capsule_231x87.jpg`
    else if (item.appId)
      return `https://steamcdn-a.akamaihd.net/steam/apps/${item.appId}/header.jpg`
    else return './steam-icon.png'
  }
  else {
    return './steam-icon.png'
  }
}
onMounted(async() => {
  const { data, pubDate } = await request({
    url: '/api/sellers',
  })
  sellers.value = data
  dayjs.extend(utc)
  dayjs.extend(timezone)
  _pubDate.value = dayjs(pubDate).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
})
</script>
