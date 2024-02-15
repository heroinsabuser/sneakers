<script setup lang="ts">
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '@/components/CardList.vue'
import { inject, reactive, watch, ref, type Ref, onMounted } from 'vue'

interface IItem {
  id: number
  title: string
  price: number
  imageUrl: string
  isAdded: boolean
  isFavorite: boolean
}

const items: Ref<IItem[]> = ref([])
const cart: Ref<IItem[]> = inject('cart')!

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://7552f4e3450dadc9.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite: any) => favorite.parentId === item.id)
      if (!favorite) {
        return item
      }
      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params: any = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get('https://7552f4e3450dadc9.mokky.dev/items', { params })
    items.value = data.map((obj: any) => ({
      ...obj,
      isAdded: false,
      isFavorite: false,
      favoriteId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

const onChangeSelect = (event: Event) => {
  filters.sortBy = (event.target as HTMLSelectElement).value
}

const onChangeSearchInput = debounce((event: Event) => {
  filters.searchQuery = (event.target as HTMLInputElement).value
}, 500)

const addToFavorite = async (item: any) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://7552f4e3450dadc9.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://7552f4e3450dadc9.mokky.dev/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

const addToCart: any = inject('addToCart')

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <div class="flex justify-between">
    <h1 class="font-bold text-3xl">Все кроссовки</h1>
    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 bg-white border border-gray-100 hover:border-gray-200 focus:border-gray-300 rounded-lg outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute top-3 left-4" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          placeholder="Поиск..."
          class="border-gray-100 border rounded-lg py-2 pl-10 pr-4 outline-none focus:border-gray-300 hover:border-gray-200"
          type="text"
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @addToCart="addToCart" @addToFavorite="addToFavorite" />
</template>
