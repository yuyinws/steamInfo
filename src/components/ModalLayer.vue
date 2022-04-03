<template>
  <Modal v-model="isPanelShow" :mask="true" direction="top">
    <div pt-10 pb-10 text-gray-400>
      <div>所有数据来自Steam公共API</div>
      <div flex items-center justify-center mt-2 @click="goGithub">
        <div i="carbon-logo-github" />
        Source Code
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { isPanelShow } from '@/composables'

function goGithub() {
  window.open('https://github.com/yuyinws/steamInfo')
}
</script>
