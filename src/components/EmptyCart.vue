<script setup lang="ts">
import { inject } from 'vue'

defineProps({
  img: String,
  title: String,
  lime: Boolean,
  description: String,
  isCart: Boolean
})
const successCart: any = inject('successCart')
</script>
<template>
  <div class="flex justify-center items-center h-full w-full flex-col">
    <img :class="isCart ? 'w-32 h-32' : 'w-20 h-20'" :src="img" alt="Empty cart" />
    <h2 :class="lime ? 'text-lime-500' : 'text-black'" class="text-2xl font-semibold mt-4">
      {{ title }}
    </h2>
    <p class="text-slate-400 mt-1 mb-4 text-balance text-center">
      {{ description }}
    </p>
    <button
      v-if="isCart"
      @click="successCart"
      class="bg-lime-500 rounded-xl py-3 text-white mt-3 px-12 transition hover:bg-lime-600 active:bg-lime-700"
    >
      Вернуться назад
    </button>
  </div>
</template>
