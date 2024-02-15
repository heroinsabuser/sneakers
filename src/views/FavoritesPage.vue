<script setup lang="ts">
import CardList from '@/components/CardList.vue'
import EmptyCart from '@/components/EmptyCart.vue'
import axios from 'axios'
import { onMounted, ref, inject, watch, type Ref } from 'vue'

const favorites: Ref<any> = ref([])
const addToCart: any = inject('addToCart')
const cart: any = inject('cart')

watch(cart, () => {
  favorites.value = favorites.value.map((item: any) => ({
    ...item,
    isAdded: false
  }))
})

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  try {
    const { data } = await axios.get('https://7552f4e3450dadc9.mokky.dev/favorites')
    favorites.value = data.map((obj: any) => ({
      ...obj.item,
      isAdded: cart.value.some((item: any) => item.id === obj.item.id)
    }))
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h1 class="font-bold text-3xl">Мои закладки</h1>
  <div v-if="favorites.length === 0" class="mt-32">
    <EmptyCart
      img="/emoji-1.png"
      title="Закладок нет :("
      description="Вы ничего не добавляли в закладки"
    />
  </div>
  <CardList is-favorite :items="favorites" @add-to-cart="addToCart" />
</template>
