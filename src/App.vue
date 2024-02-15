<script setup lang="ts">
import { ref, watch, computed, type Ref, provide } from 'vue'
import axios from 'axios'

import MyCart from './components/MyCart.vue'
import MyHeader from './components/MyHeader.vue'

const cart: Ref<any> = ref([])
provide('cart', cart)

const isCreatingOrder: Ref<boolean> = ref(false)
const isOrderSuccess: Ref<boolean> = ref(false)

const cartOpen = ref(false)

const openCart = () => {
  cartOpen.value = !cartOpen.value
}

const successCart = () => {
  cartOpen.value = false
  isOrderSuccess.value = false
}
provide('successCart', successCart)

const addToCart = async (item: any) => {
  if (!item.isAdded) {
    cart.value.push(item)
    item.isAdded = true
  } else {
    cart.value.splice(cart.value.indexOf(item), 1)
    item.isAdded = false
  }
}

provide('addToCart', addToCart)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    await axios.post('https://7552f4e3450dadc9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return (isOrderSuccess.value = true)
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const totalPrice = computed(() =>
  cart.value.reduce((acc: number, item: any) => acc + item.price, 0)
)

const disabledCartBtn = computed(() => isCreatingOrder.value || cart.value.length === 0)

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
</script>

<template>
  <div class="w-4/5 m-auto bg-white mt-20 rounded-xl shadow-xl">
    <MyHeader :total-price="totalPrice" @openCart="openCart" />

    <div class="px-16 py-8">
      <router-view></router-view>
    </div>
  </div>
  <MyCart
    @createOrder="createOrder"
    :total-price="totalPrice"
    :cart="cart"
    @addToCart="addToCart"
    @openCart="openCart"
    :disabledCartBtn="disabledCartBtn"
    v-if="cartOpen === true"
    :isOrderSuccess="isOrderSuccess"
  />
</template>

<style scoped></style>
