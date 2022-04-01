<template>
  <div absolute bottom-1 w-full>
    <div divider mb-2 />
    <div flex justify-around>
      <div
        v-for="item in menus"
        :key="item.name"
        items-center
        flex
        flex-col
        :class="['pt-1', item.active ? 'text-#467393' : '']"
        @click="goPage(item.path)"
      >
        <div :class="item.icon" />
        <div text-12px mt-1>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
const router = useRouter()
const route = useRoute()
interface MenuItem {
  name: string
  path: string
  icon: string
  active: boolean
}

const menus: Ref<MenuItem[]> = ref([
  { name: '统计数据', path: '/games', icon: 'i-carbon-analytics', active: false },
  { name: '热销榜', path: '/sellers', icon: 'i-carbon-fire', active: false },
])

const goPage = (path: string) => {
  router.push(path)
}

router.beforeEach((to, from, next) => {
  menus.value.forEach((item) => {
    item.active = item.path === to.path
  })
  next()
})

onMounted(() => {
  menus.value.forEach((item) => {
    item.active = item.path === route.path
  })
})
</script>
