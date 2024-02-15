<script lang="ts" setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="w-52 bg-white border-gray-100 border rounded-3xl p-7 relative cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      class="absolute"
      :src="!isFavorite ? 'like-1.svg' : 'like-2.svg'"
      alt=""
    />
    <img :src="imageUrl" alt="" />
    <p class="text-sm font-regular">{{ title }}</p>
    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-xs uppercase text-slate-500">Цена:</span>
        <b class="text-sm font-bold">{{ price }} руб.</b>
      </div>
      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="" />
    </div>
  </div>
</template>
