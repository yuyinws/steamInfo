<template>
  <div v-if="sellers.length && sellers[0]._base64" mb-100px pb-12 pt-12 p-2>
    <div flex="~ row gap-4 wrap" justify-center>
      <div v-for="(item, index) in sellers" :key="index" @click="goGamePage(item)">
        <div
          flex
          justify-center
          w-full
          bg-white
          p-2
          dark:bg-normalDark
          active:bg-gray-200
          class="active:dark:bg-gray-600"
          rounded-t-md
          text-18px
          text-gray-400
        >
          {{ item.name }}
        </div>
        <div flex w-full bg-white rounded-b-md>
          <img rounded-b-md w-120 h-50 object-cover :src="item._base64">
        </div>
      </div>
    </div>
    <div text-12px text-center text-gray-400 mt-5 mb-5>
      更新于 {{ _pubDate }}
    </div>
  </div>

  <div v-else flex="~ row gap-4 wrap" mb-100px pb-12 pt-12 p-2 justify-center>
    <Skeletor v-for="item in 10" :key="item" width="30rem" height="15rem" rounded-md />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Skeletor } from 'vue-skeletor'
import { request } from '@/composables'

interface Seller {
  name: string
  appId: string | null
  subId: string | null
  content: boolean
  link: string
  _base64: string
}
const sellers: Ref<Seller[]> = ref([])
const _pubDate: Ref<string> = ref('')
const getImageRaw = async() => {
  const requestAll: any[] = []
  sellers.value.forEach((item) => {
    let url = ''
    if (item.content) {
      if (item.appId)
        url = `https://steamcdn-a.akamaihd.net/steam/apps/${item.appId}/header.jpg`
      else
        url = `https://cdn.akamai.steamstatic.com/steam/subs/${item.subId}/capsule_231x87.jpg`
    }
    else {
      url = 'https://raw.githubusercontent.com/yuyinws/steamInfo/master/public/steam-icon.png'
    }
    requestAll.push(request({
      url: `/api/img?url=${url}`,
      method: 'GET',
    }))
  })
  Promise.allSettled(requestAll).then((res) => {
    res.forEach((item, index) => {
      if (item.status === 'fulfilled')
        sellers.value[index]._base64 = item.value._base64
    })
  })
}

function goGamePage(item: Seller) {
  window.open(item.link)
}

onMounted(async() => {
  const { data, pubDate } = await request({
    url: '/api/sellers',
  })
  sellers.value = data
  getImageRaw()
  dayjs.extend(utc)
  dayjs.extend(timezone)
  _pubDate.value = dayjs(pubDate).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
})
</script>
