<script setup lang="ts">
import MyCard from './MyCard.vue'
defineProps({
  items: Array,
  isFavorite: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="pt-10 flex flex-wrap gap-10 justify-center" v-auto-animate>
    <MyCard
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :isFavorite="item.isFavorite"
      :on-click-favorite="isFavorite ? null : () => emit('addToFavorite', item)"
      :on-click-add="() => emit('addToCart', item)"
    />
  </div>
</template>
