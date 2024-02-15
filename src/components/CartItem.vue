<script lang="ts" setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
  price: Number,
  imageUrl: String,
  title: String,
  id: Number
})
</script>

<template>
  <div class="flex border border-slate-100 rounded-xl p-5">
    <img class="w-16 h-16 mr-5" :src="imageUrl" alt="" />
    <div class="flex flex-1 flex-col">
      <p class="leading-tight mb-auto">{{ title }}</p>
      <b>{{ price }} руб.</b>
    </div>
    <img
      @click="emit('onClickRemove')"
      class="cursor-pointer w-8 h-8 my-auto opacity-50 hover:opacity-100"
      src="/close.svg"
      alt=""
    />
  </div>
</template>
